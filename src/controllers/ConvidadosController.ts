import {Request , Response} from 'express';
import db from '../databases/database';
export default class ConvidadosController{
 async index (request: Request,response: Response){
    if(request.body != null) {
      return response.json(await db('convidados').where(request.body).orderBy('id'));
    }

    if (request.query.id ==null){
      return response.json(await db('convidados').select('*').orderBy('id'));
    }
    
    const convidado = await db('convidados').where('id', request.query.id).first();
    if (!convidado) {
      return { mensagem: 'Convidado não encontrado' };
    }
    if (convidado.idfamilia == 0){
  return response.json({
        'convidado': convidado,
        'familia': [convidado]
      });
    }
    const familiares = await db('convidados')
      .where({ idfamilia: convidado.idfamilia }).orderBy('id');

   return response.json({
      'convidado': convidado,
      'familia': familiares
    });
 }

 async responder(request: Request,response: Response){

  await db('convidados')
  .where('id', request.query.id)
  .update({
    confirmacao1: request.query.confirmacao
  });
    
  return response.json(await db('convidados').select('*'));
 }

 async responderCrianca(request: Request,response: Response){

  let faixapreco = 1;
  if (Number(request.query.idade) < 7){
    faixapreco = 2;
  }
  await db('convidados')
  .where('id', request.query.id)
  .update({
    confirmacao1: request.query.confirmacao,
    idade: request.query.idade,
    faixapreco:faixapreco
  });
    
  return response.json(await db('convidados').select('*'));
 }

 async count (request: Request,response: Response){
    
    if (request.body != null){
      return response.json(await db('convidados').where(request.body).count().first());
    }
    const total = await db('convidados').where({}).count().first(); 
    const numConfirmados = await db('convidados').where({"confirmacao1":"S"}).count().first();
    const numNegados = await db('convidados').where({"confirmacao1":"N"}).count().first();
    const numPagantes100 = await db('convidados').where({"faixapreco":"1"}).count().first();
    const numPagantesConfirmados = await db('convidados').where({"faixapreco":"1", "confirmacao1":"S"}).count().first();
    const numPagantes0 = await db('convidados').where({"faixapreco":"2"}).count().first();
    return  response.json({
                      total: Number(total.count),
                      numConfirmados:Number(numConfirmados.count),
                      numNegados:Number(numNegados.count),
                      numPagantes100:Number(numPagantes100.count),
                      numPagantes0:Number(numPagantes0.count),
                      numPagantesConfirmados:Number(numPagantesConfirmados.count)
                    }
    );
 }




}