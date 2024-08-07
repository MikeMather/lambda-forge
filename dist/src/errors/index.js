"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.NotFoundError = exports.GenericError = void 0;
const generic_error_1 = __importDefault(require("./generic.error"));
exports.GenericError = generic_error_1.default;
const notFound_error_1 = __importDefault(require("./notFound.error"));
exports.NotFoundError = notFound_error_1.default;
const validation_error_1 = __importDefault(require("./validation.error"));
exports.ValidationError = validation_error_1.default;
