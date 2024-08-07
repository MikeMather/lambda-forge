"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomContext = void 0;
function CustomContext(target, propertyKey, parameterIndex) {
    Reflect.defineMetadata('context', { index: parameterIndex }, target, propertyKey);
}
exports.CustomContext = CustomContext;
