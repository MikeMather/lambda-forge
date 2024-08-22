"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Req = void 0;
require("reflect-metadata");
function Req() {
    return (target, propertyKey, parameterIndex) => {
        Reflect.defineMetadata('request', { index: parameterIndex }, target, propertyKey);
    };
}
exports.Req = Req;
