import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  // interecept this request and remove the password field
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;

    // request -> controller findUser() -> service findOne()
    // response -> user entity instance (directions on how to turn this instance of a class into a plain object) -> class serialie interceptor (turns an instance of user entity into a plain object based on some rules)
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Post('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
