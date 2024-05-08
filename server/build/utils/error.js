"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../types/customError");
const errorHandler = (statusCode, message) => {
    return new customError_1.CustomError(statusCode, message);
};
exports.errorHandler = errorHandler;
