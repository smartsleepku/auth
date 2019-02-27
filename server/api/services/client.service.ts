import { IClient, Client } from '../../common/models/client';
import { AuthLoginBody } from '../../common/models/login';
import { JwtToken } from './jwt.service';

export class ClientService {
  public async validClient(userBody: AuthLoginBody): Promise<IClient | null> {
    return (await Client.findOne({
      clientId: userBody.clientId,
      clientSecret: userBody.clientSecret,
    }))
  }

  public async authorizedClient(token: JwtToken): Promise<boolean> {
    return (await Client.findOne({
      clientId: token.clientId,
      clientSecret: token.clientSecret,
      authorized: true,
    })) != null;
  }

  public async createAuthorizedClient(clientId: string, clientSecret: string): Promise<void> {
    await Client.create({
      clientId: clientId,
      clientSecret: clientSecret,
      authorized: true,
    });
  }

}

export default new ClientService();
