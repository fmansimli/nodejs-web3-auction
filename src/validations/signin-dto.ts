import { IsEmail, MinLength, MaxLength } from "class-validator";
import { Expose } from "class-transformer";

export class SignInDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
