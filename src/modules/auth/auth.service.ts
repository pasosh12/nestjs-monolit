import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@/modules/users/user.service';
import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import bcrypt from 'bcrypt';
import { User } from '@/modules/users/user.entity';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const userExist = await this.userService.findOneByEmail(email);
    if (userExist) {
      throw new ConflictException('User already exist');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await this.userService.create(email, hashedPassword);
    const { password: _, ...secureUser } = newUser;
    return {
      message: 'User Successfully registered',
      user: secureUser,
    };
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ message: string; user: Omit<User, 'password'> }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Password');
    }

    const { password: _, ...result } = user;
    return {
      message: 'User Successfully registered',
      user: result,
    };
  }
}
