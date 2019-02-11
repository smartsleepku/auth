import { IClient, Client } from '../../common/models/client';
import { AuthLoginBody } from '../../common/models/login';

export class ClientService {
  public async validClient(userBody: AuthLoginBody): Promise<IClient | null> {
    return (await Client.findOne({
      clientId: userBody.clientId,
      clientSecret: userBody.clientSecret,
    }))
  }
}

export default new ClientService();
