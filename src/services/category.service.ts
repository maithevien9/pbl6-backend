import { ICategory, Category } from '../models';

class CategoryService {
  static getAll = async (): Promise<ICategory[]> => {
    return Category.find({}).select('name').lean();
  };
}

export default CategoryService;
