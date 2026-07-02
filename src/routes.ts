import express from 'express';
import ConvidadosController from './controllers/ConvidadosController';

const routes = express.Router();

const convidadosController = new ConvidadosController();
//routes.post('/classes',classesController.create);
routes.get('/convidados',convidadosController.index);
routes.get('/responder',convidadosController.responder);
routes.get('/responderCrianca',convidadosController.responderCrianca);
routes.get('/count',convidadosController.count);




export default routes;