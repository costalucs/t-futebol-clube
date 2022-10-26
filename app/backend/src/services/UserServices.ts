import { IUser } from '../interfaces/IUser';
import User from '../database/models/User';

export default class UserService {
  model = User;
  findByEmail = async (email:string): Promise<IUser> => {
    const user = await this.model.findOne({ where: { email } });

    return user as IUser;
  };
}
