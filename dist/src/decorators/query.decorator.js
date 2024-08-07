"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
require("reflect-metadata");
function Query() {
    return function (target, propertyKey, parameterIndex) {
        Reflect.defineMetadata('query', { index: parameterIndex }, target, propertyKey);
    };
}
exports.Query = Query;
