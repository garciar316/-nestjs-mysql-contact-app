import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
//PartialType hace que herede las propiedades del padre como datos opcionales
export class UpdateContactDto extends PartialType(CreateContactDto) {}
