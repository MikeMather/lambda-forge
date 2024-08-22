"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
class Request {
    constructor(event) {
        this.query = event.queryStringParameters || {};
        this.params = event.pathParameters || {};
        this.headers = event.headers || {};
        this.body = event.body ? JSON.parse(event.body) : null;
        this.context = {};
    }
}
exports.Request = Request;
