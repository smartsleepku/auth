import * as jwt from 'jwt-simple';
import * as config from 'ordered-config';

export interface JwtToken {
  userId?: string;
  session?: string;
  clientId?: string;
  clientSecret?: string;
}

export class JwtService {
  public encodeUser(userId: string, sessionId: string): string {
    return jwt.encode({
      userId: userId,
      session: sessionId,
    }, config.auth.jwtSecret);
  }

  public encodeAuthorizedClient(clientId: string, clientSecret: string): string {
    return jwt.encode({
      clientId: clientId,
      clientSecret: clientSecret,
    }, config.auth.jwtSecret);
  }

  public decode(token: string): JwtToken | null {
    return jwt.decode(token, config.auth.jwtSecret);
  }
}

export default new JwtService();
