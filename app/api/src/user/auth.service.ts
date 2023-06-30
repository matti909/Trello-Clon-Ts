import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainTohash = await hash(password, 10);
    userObject = { ...userObject, password: plainTohash };

    return this.userModel.create(userObject);
  }

  async login(loginBody: LoginAuthDto) {
    const { email, password } = loginBody;
    const findUser = await this.userModel.findOne({ email });

    if (!findUser) throw new HttpException('no se encontro', 404);

    const checkPass = await compare(password, findUser.password);

    if (!checkPass) throw new HttpException('pass incorrect', 403);

    const payload = { id: findUser._id, name: findUser.name };

    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };
    return data;
  }
}
