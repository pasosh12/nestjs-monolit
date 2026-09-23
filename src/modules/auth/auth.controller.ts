import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { JoiValidationPipe } from '@/common/pipes/joi-validation.pipe';
import {
  CreateUserDto,
  createUserSchema,
} from '@/modules/auth/dto/create-user.dto';
import { LoginDto, loginSchema } from '@/modules/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
