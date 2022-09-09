import { PartialType } from '@nestjs/mapped-types';
import { CreatePhoneDto } from './create-phone.dto';
//PartialType hace que herede las propiedades del padre como datos opcionales
export class UpdatePhoneDto extends PartialType(CreatePhoneDto) {}
