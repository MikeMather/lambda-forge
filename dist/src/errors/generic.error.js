"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = require("../utils/httpResponse");
class GenericError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
    toResponse() {
        return new httpResponse_1.HttpResponse(this.statusCode, { message: this.message });
    }
}
exports.default = GenericError;
