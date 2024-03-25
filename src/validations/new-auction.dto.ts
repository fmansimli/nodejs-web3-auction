import { MinLength, MaxLength } from "class-validator";
import { Expose } from "class-transformer";

export class NewAuctionDto {
  @Expose()
  @MinLength(5)
  @MaxLength(14)
  title: string;

  @MinLength(5)
  @MaxLength(50)
  desc: string;
}
