import { Request, Response } from 'express';
import L from '../../../common/logger';

export class Controller {
  async setcookie(req: Request, res: Response): Promise<void> {
    L.info('GET /auth/setcookie - in /server/api/controllers/setcookie/controller::setcookie');
    const jwt = req.query.auth;
    res.cookie('auth', jwt);
    res.status(200).send('');
  }
}
export default new Controller();
