import mongoose from 'mongoose';

export interface ISession extends mongoose.Document {
  _id: string;
  userId: string;
}

/* tslint:disable-next-line:variable-name This is a class */
export const Session: mongoose.Model<ISession> = mongoose.model<ISession>('Session', new mongoose.Schema({
  userId: String,
}, {
  bufferCommands: false,
}));
