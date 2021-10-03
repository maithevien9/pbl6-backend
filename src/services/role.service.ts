import { IRole, Role } from '../models';

class RoleService {
  static getAll = async (): Promise<IRole[]> => {
    return Role.find({}).select('name').lean();
  };
}

export default RoleService;
