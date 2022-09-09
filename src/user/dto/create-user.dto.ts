import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

//Para usar los validators hay que modificar main.ts
export class CreateUserDto {
  @IsNumber()
  readonly id?: number;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly password: string;
}
