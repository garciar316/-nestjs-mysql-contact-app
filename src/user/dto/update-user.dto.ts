import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//Para usar los valdators hay que modificar main.ts
export class UpdateUserDto extends PartialType(CreateUserDto) {}
