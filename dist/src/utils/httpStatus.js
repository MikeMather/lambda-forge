"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidStatusCode = void 0;
const isValidStatusCode = (statusCode) => {
    if (isNaN(statusCode)) {
        return false;
    }
    if (statusCode < 100 || statusCode > 599) {
        return false;
    }
    return true;
};
exports.isValidStatusCode = isValidStatusCode;
