import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly usermodel: Model<User>) { };
  users: CreateUserDto[] = [];

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.usermodel({
      username: user.username,
      password: await bcrypt.hash(user.password, 12)
    })

    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.usermodel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.usermodel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('Could not find user!!');
    }
    return user;
  }
}
