import ClientService from '../../services/client.service';
import UserService from '../../services/user.service';
import { Controller as LoginController } from '../../controllers/login/controller';
import { Request, Response } from 'express';
import { AuthLoginBody } from '../../../common/models/login';
import L from '../../../common/logger';

export class Controller {

  async query(req: Request, res: Response): Promise<void> {
    L.info('GET /auth/attendee/:code - in /server/api/controllers/attendee/controller::query');
    const clientId = req.headers['x-client-id'];
    const clientSecret = req.headers['x-client-secret'];
    const code = req.params.code;
    const client = await ClientService.validClient({
      clientId: clientId as string,
      clientSecret: clientSecret as string,
    });
    if (client == null) { res.status(403).send({ error: 'invalid client' }) ; return }
    const valid = await UserService.validAttendeeCode(code);
    res.status(200).send({
      code: code,
      valid: valid,
    });
  }

  async update(req: Request, res: Response): Promise<void> {
    L.info('POST /auth/attendee - in /server/api/controllers/attendee/controller::update');
    const form = req.body as AuthLoginBody;
    try {
      const client = await ClientService.validClient(form);
      if (client == null) { res.status(403).send({ error: 'invalid client' }) ; return }
      const valid = await UserService.validAttendeeCode(form.attendeeCode);
      if (!valid) { res.status(403).send({ error: 'invalid code' }) ; return }
      await UserService.updateUser(form.email, form.password, form.attendeeCode);
      await new LoginController().login(req, res);
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
