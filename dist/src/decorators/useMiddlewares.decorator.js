"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMiddlewares = void 0;
require("reflect-metadata");
function UseMiddlewares(middlewares) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('middlewares', middlewares, target, propertyKey);
    };
}
exports.UseMiddlewares = UseMiddlewares;
