import { IUser } from './models';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }

    interface Pagination {
      limit: number;
      skip: number;
    }
  }
}
