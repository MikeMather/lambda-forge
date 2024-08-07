"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Returns = void 0;
const httpStatus_1 = require("../utils/httpStatus");
/**
 * Specifies the return type of the function. Uses class validator to ensure the return type is correct.
 * @returns
 */
function Returns(statusCode, validatorCls, options) {
    return function (target, propertyKey, descriptor) {
        if (validatorCls === null || validatorCls === undefined || typeof validatorCls !== 'function') {
            throw new Error('Invalid validator class for @Returns() decorator. Ensure that the class is imported and passed correctly.');
        }
        if (!(0, httpStatus_1.isValidStatusCode)(statusCode)) {
            throw new Error('Invalid status code for @Returns() decorator. Ensure that the status code is a valid HTTP status code.');
        }
        Reflect.defineMetadata('returns', validatorCls, target, propertyKey);
        Reflect.defineMetadata('statusCode', statusCode, target, propertyKey);
        Reflect.defineMetadata('returnsMany', !!(options === null || options === void 0 ? void 0 : options.many), target, propertyKey);
    };
}
exports.Returns = Returns;
