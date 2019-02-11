import { Application } from 'express';
import loginRouter from './api/controllers/login/router';
import validateRouter from './api/controllers/validate/router';
export default function routes(app: Application): void {
  app.use('/auth/login', loginRouter);
  app.use('/auth/validate', validateRouter);
};
