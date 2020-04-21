import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

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
    let newCategory;
    const categoryRepository = getRepository(Category);

    newCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!newCategory) {
      newCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(newCategory);
    }

    const transactionRepository = getRepository(Transaction);

    transactionRepository.find();

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
