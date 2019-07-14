import { ISession, Session } from '../../common/models/session';
import { IUser, User } from '../../common/models/user';
import * as config from 'ordered-config';
import crypto from 'crypto';
import L from '../../common/logger';

function trimLeft(a: String, charlist: String) {
  if (charlist === undefined)
    charlist = "\s";

  return a.replace(new RegExp("^[" + charlist + "]+"), "");
};

function trimRight(a: String, charlist: String) {
  if (charlist === undefined)
    charlist = "\s";

  return a.replace(new RegExp("[" + charlist + "]+$"), "");
};

export class UserService {
  public async upsertSession(userId: string): Promise<ISession> {
    let session = await Session.findOneAndUpdate({ userId: userId },
      { userId: userId },
      // @ts-ignore Typescript does not handle declaration of returnNewDocument
      { upsert: true, returnNewDocument: true });
    if (!session) {
      // findOneAndUpdate() may not return new document despite being told to
      // call findOne() to get the new document after creating it
      session = await Session.findOne({ userId: userId });
    }
    return session;
  }

  public async validSession(userId: string): Promise<boolean> {
    return (await Session.findOne({ userId: userId })) != null;
  }

  public async validUser(emailAddress: string, password: string): Promise<IUser | null> {
    var hash = crypto.createHash('sha256').update(password + config.crypto.seed).digest('hex');
    L.debug('password: ' + password + ', seed: ' + config.crypto.seed + ', hash: ' + hash);
    return (await User.findOne({
      emailAddress: emailAddress,
      password: hash,
    }));
  }

  public async validAttendeeCode(code: string): Promise<boolean> {
    L.debug('validAttendeeCode: ' + code);
    let trimmed = trimLeft(trimRight(code, ' '), ' ');
    return (await User.find( { $or:[ { attendeeCode: trimmed}, {attendeeCode: ' ' + trimmed + ' '}]})) != null;
  }

  public async updateUser(emailAddress: string, password: string, code: string): Promise<void> {
    var hash = crypto.createHash('sha256').update(password + config.crypto.seed).digest('hex');
    await User.findOneAndUpdate(
      { attendeeCode: code },
      {
        emailAddress: emailAddress,
        password: hash,
      },
    );
  }

  public async logout(email: string): Promise<void> {
    await Session.remove({ email: email });
  }
}

export default new UserService();
