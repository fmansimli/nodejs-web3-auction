import { IsEmail, MinLength } from "class-validator";
import { Exclude } from "class-transformer";

export class SignInDto {
  @IsEmail()
  email: string;

  @Exclude()
  @MinLength(8)
  password: string;
}
