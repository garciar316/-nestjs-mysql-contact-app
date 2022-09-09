import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MaxLength,
  IsNumber,
  IsObject,
} from 'class-validator';

//Para usar los validators hay que modificar main.ts
export class CreateContactDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly surname: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly state: boolean;

  @IsObject()
  @IsNotEmpty()
  user: { id: number };
}
