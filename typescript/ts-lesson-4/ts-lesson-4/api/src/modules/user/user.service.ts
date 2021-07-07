import { Injectable, NotFoundException } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService implements  {
  constructor(private readonly _userRepository) {}
  
  //user作成処理
  async createUser(param) {
    const newUser = new User();
    newUser.id = nanoid();
    const newUserParam = this._userRepository.create({
      ...newUser,
      ...param,
    });
    const user = await this._userRepository.save(newUserParam);
    return { user };
  }

  //user全件取得処理
  async getUsers() {
    const users = await this._userRepository.find();
    if (!users) throw new NotFoundException();
    return { users }
  }

  //user取得処理
  async findUser(userId) {
    const user = await this._userRepository.findOne(userId);
    if (!user) throw new NotFoundException();
    return { user };
  }
  
  //user更新処理
  async updateUser(userId, param) {
    const origin = await this._userRepository.findOne(userId);
    if (!origin) throw new NotFoundException();
    const user = await this._userRepository.save({
      ...origin,
      ...param
    });
    return { user };
  }
}
