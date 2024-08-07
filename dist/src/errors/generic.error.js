"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = require("../utils/httpResponse");
class GenericError extends Error {
    constructor(message) {
        super(message);
        this.name = 'GenericError';
        this.statusCode = 500;
    }
    toResponse() {
        return new httpResponse_1.HttpResponse(this.statusCode, { message: this.message });
    }
}
exports.default = GenericError;
