import ClientService from '../../services/client.service';
import UserService from '../../services/user.service';
import JwtService from '../../services/jwt.service';
import { Request, Response } from 'express';
import { AuthLoginBody } from '../../../common/models/login';
import L from '../../../common/logger';

export class Controller {
  async login(req: Request, res: Response): Promise<void> {
    L.info('POST /auth/login - in /server/api/controllers/login/controller::login');
    const form = req.body as AuthLoginBody;
    try {
      const client = await ClientService.validClient(form);
      if (client == null) { res.status(403).send({ error: 'invalid client' }) ; return }
      const user = await UserService.validUser(form.email, form.password);
      if (user == null) { res.status(403).send({ error: 'invalid credentials' }) ; return }
      const session = await UserService.upsertSession(user._id);
      res.status(200)
        .send({
          jwt: JwtService.encodeUser(session.userId, session._id),
        }
      );
    } catch (error) {
      L.error(error);
      res.status(500).send({
        error: 'Failed',
      });
      process.exit(1);
    };
  }
}
export default new Controller();
