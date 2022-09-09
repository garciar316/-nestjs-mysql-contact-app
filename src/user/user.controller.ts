import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(
    @Res({ passthrough: true }) res,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      res.status(HttpStatus.CREATED);
      return newUser;
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        statusCode: 400,
        message: 'Error: no se creo el usuario',
        error: err.message,
      };
    }
  }

  @Put()
  async updateUser(
    @Res({ passthrough: true }) res,
    @Body() updateUsertDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(updateUsertDto);
      res.status(HttpStatus.OK);
      return existingUser;
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        message: 'Ha ocurrido un error, no se ha actualizado el usuario',
        error: err.message,
      };
    }
  }

  @Get()
  async getUsers(@Res({ passthrough: true }) res) {
    try {
      const userData = await this.userService.getUsers();
      res.status(HttpStatus.OK);
      return userData;
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }

  @Get(':id')
  async getUserById(
    @Res({ passthrough: true }) res,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    try {
      const teléfono = await this.userService.getUserById(userId);
      res.status(HttpStatus.OK);
      return teléfono;
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }

  @Delete(':id')
  async deleteUser(
    @Res({ passthrough: true }) res,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    try {
      const message = await this.userService.deleteUser(userId);
      res.status(HttpStatus.OK);
      return { message };
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        message: 'Ha ocurrido un error en el sistema',
        error: err.message,
      };
    }
  }
}
