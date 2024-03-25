"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validation_error_1 = require("../errors/validation-error");
const validate = (Dto) => {
    return async (req, res, next) => {
        try {
            const values = (0, class_transformer_1.plainToInstance)(Dto, req.body, {
                excludeExtraneousValues: true
            });
            const errors = await (0, class_validator_1.validate)(values);
            if (errors.length > 0) {
                throw new validation_error_1.ValidationError(errors);
            }
            req.body = values;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validate = validate;
