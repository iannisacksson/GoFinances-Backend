import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const CreateTransaction = new CreateTransactionService();

  const transation = await CreateTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transation);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
