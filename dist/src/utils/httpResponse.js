"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
class HttpResponse {
    constructor(statusCode, body) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
    }
    toResponse() {
        return {
            statusCode: this.statusCode,
            body: this.body
        };
    }
    static ok(body) {
        return new HttpResponse(200, body);
    }
    static created(body) {
        return new HttpResponse(201, body);
    }
    static noContent() {
        return new HttpResponse(204);
    }
}
exports.HttpResponse = HttpResponse;
