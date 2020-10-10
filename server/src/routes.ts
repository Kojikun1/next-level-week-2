import express from 'express';

const routes = express.Router();

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';


routes.get('/', (req, res)=> {
    return res.status(200).json({message: "working"});
})

routes.post('/classes', ClassesController.create);
routes.get('/classes',ClassesController.index);

routes.post('/connections', ConnectionsController.create);
routes.get('/connections', ConnectionsController.index);

export default routes;