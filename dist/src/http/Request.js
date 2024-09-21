"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
class Request {
    constructor(event) {
        this.query = event.queryStringParameters || {};
        this.params = event.pathParameters || {};
        this.headers = event.headers || {};
        this.body = this.parseBody(event.body || '');
        this.context = {};
    }
    parseBody(body) {
        try {
            return JSON.parse(body);
        }
        catch (error) {
            return body;
        }
    }
}
exports.Request = Request;
