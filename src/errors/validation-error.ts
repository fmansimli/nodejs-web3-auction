import { CustomError, IError } from "./custom-error";

export class ValidationError extends CustomError {
  public httpCode = 400;

  constructor(private errors: any[]) {
    super("Validation Error");

    this.message = "Validation Error";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serialize(): IError {
    return {
      httpCode: this.httpCode,
      message: this.message,
      errors: this.errors.map((error) => {
        return {
          field: error.field,
          constraints: error.constraints
        };
      })
    };
  }
}
