import { verify, sign, decode } from "jsonwebtoken";

export class Jwt {
  static verifyAsync(token: string) {
    return verify(token, process.env.JWT_SECRET as string);
  }

  static signAsync(payload: any, expiresIn = "1h") {
    return sign(payload, process.env.JWT_SECRET as string, { expiresIn });
  }

  static signKey(payload: any) {
    return sign(payload, process.env.JWT_SECRET as string, { expiresIn: "420d" });
  }

  static async unpack(token: string) {
    return decode(token);
  }
}
