"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor() { }
    status(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    setHeader(key, value) {
        if (!this.headers) {
            this.headers = {};
        }
        this.headers[key] = value;
        return this;
    }
    send() {
        return {
            statusCode: this.statusCode,
            headers: this.headers,
            body: this.body
        };
    }
}
exports.Response = Response;
