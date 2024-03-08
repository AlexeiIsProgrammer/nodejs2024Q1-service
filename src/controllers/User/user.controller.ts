import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './interfaces';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(StatusCodes.OK)
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
