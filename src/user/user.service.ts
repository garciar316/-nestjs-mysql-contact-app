import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    if (!updateUserDto.id) {
      throw new NotFoundException(
        `Para actualizar un usuario debe ingresar el id`,
      );
    }
    const existingUser = await this.userRepository.findOneBy({
      id: updateUserDto.id,
    });
    if (!existingUser) {
      throw new NotFoundException(
        `No se encontro un usuario con id ${updateUserDto.id}`,
      );
    }
    this.userRepository.merge(existingUser, updateUserDto);
    return this.userRepository.save(existingUser);
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new NotFoundException(`No se encontraron usuarios`);
    }
    return users;
  }

  async getUserById(userId: number): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id: userId });
    if (!existingUser) {
      throw new NotFoundException(`No se encontro el usuario con id ${userId}`);
    }
    return existingUser;
  }

  async deleteUser(userId: number): Promise<string> {
    const existingUser = await this.userRepository.findOneBy({ id: userId });
    if (!existingUser) {
      return `No existe un usuario con el id ${userId}`;
    }
    const message = await this.userRepository.delete(userId);
    if (message.affected === 0) {
      return `Ha ocurrido un error y no se elimino el usuario`;
    }
    return `Se ha eliminado con exito el usuario`;
  }
}
