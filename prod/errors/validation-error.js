"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const custom_error_1 = require("./custom-error");
class ValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super("Validation Error");
        this.errors = errors;
        this.httpCode = 400;
        this.message = "Validation Error";
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    serialize() {
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
exports.ValidationError = ValidationError;
