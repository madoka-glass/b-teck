import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) { };

  async validateUser({ username, password }: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.usersService.findOne(username);
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
  async login(user: CreateUserDto): Promise<{ access_token: string }> {
    if (await this.validateUser(user)) {
      const payload = { username: user.username };
      return {
        'access_token': this.jwtService.sign(payload)
      }
    }
  }
}
