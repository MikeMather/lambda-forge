"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generic_error_1 = __importDefault(require("./generic.error"));
const httpResponse_1 = require("../utils/httpResponse");
/**
 * ValidationError class
 * @extends GenericError
 * @param {string} message - Error message
 * @param {string[]} errors - Array of errors
 * @param {number} statusCode - HTTP status code
 */
class ValidationError extends generic_error_1.default {
    constructor(message, errors) {
        super('ValidationError', 400, message);
        this.errors = errors;
    }
    toResponse() {
        return new httpResponse_1.HttpResponse(this.statusCode, {
            message: this.message,
            errors: this.errors
        });
    }
}
exports.default = ValidationError;
