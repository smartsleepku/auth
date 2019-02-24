import express from 'express';
import controller from './controller';
export default express.Router()
    .get('/:code', controller.query)
    .post('/:code', controller.update);
