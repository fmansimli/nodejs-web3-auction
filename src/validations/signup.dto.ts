import { IsEmail, MinLength, MaxLength } from "class-validator";
import { Exclude } from "class-transformer";

export class SignUpDto {
  @IsEmail()
  email: string;

  @Exclude()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
