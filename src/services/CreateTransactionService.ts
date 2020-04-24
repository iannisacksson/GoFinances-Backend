import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);

    let newCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!newCategory) {
      newCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(newCategory);
    }

    const transactionRepository = getCustomRepository(TransactionsRepository);

    const checkBalance = await transactionRepository.getBalance();

    if (value > checkBalance.total && type === 'outcome') {
      throw new AppError('Insufficient funds');
    }

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id: newCategory?.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
