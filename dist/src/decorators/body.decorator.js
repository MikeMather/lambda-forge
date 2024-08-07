"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
require("reflect-metadata");
/**
 * Decorator to inject the body of the request into the handler method
 * @param dto The DTO class to validate the body against
 * @returns The decorated class
 */
function Body(dto) {
    return function (target, propertyKey, parameterIndex) {
        Reflect.defineMetadata('body', { index: parameterIndex, bodyType: dto }, target, propertyKey);
    };
}
exports.Body = Body;
