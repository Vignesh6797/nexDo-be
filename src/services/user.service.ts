import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../types/user';
import { isEmpty } from '../utils/util';
import User from '../models/users.model'

class UserService {

  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await User.find();
    return users;
  }

  public async findUserById(userId: string): Promise<IUser> {
    const findUser: IUser = await User.findOne({ "_id" : userId});
    if (!findUser) throw new HttpException(409, "You're not an auhthorized user");

    return findUser;
  }

  // public async createUser(userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: User = this.users.find(user => user.email === userData.email);
  //   if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const createUserData: User = { id: this.users.length + 1, ...userData, password: hashedPassword };

  //   return createUserData;
  // }

  // public async updateUser(userId: number, userData: User): Promise<User[]> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: User = this.users.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "You're not user");

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const updateUserData: User[] = this.users.map((user: User) => {
  //     if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
  //     return user;
  //   });

  //   return updateUserData;
  // }

  // public async deleteUser(userId: number): Promise<User[]> {
  //   const findUser: User = this.users.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "You're not user");

  //   const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
  //   return deleteUserData;
  // }
}

export default UserService;
