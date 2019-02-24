import { Application } from 'express';
import loginRouter from './api/controllers/login/router';
import validateRouter from './api/controllers/validate/router';
import attendeeRouter from './api/controllers/attendee/router';
export default function routes(app: Application): void {
  app.use('/auth/login', loginRouter);
  app.use('/auth/validate', validateRouter);
  app.use('/auth/attendee', attendeeRouter);
};
