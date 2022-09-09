import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';

//Para usar los validators hay que modificar main.ts
export class CreatePhoneDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly phone: string;

  @IsObject()
  @IsNotEmpty()
  readonly contact: { id: number };
}
