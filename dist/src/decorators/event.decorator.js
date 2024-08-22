"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
require("reflect-metadata");
function Event() {
    return (target, propertyKey, parameterIndex) => {
        if (propertyKey === undefined) {
            throw new Error('Event decorator can only be used on a method parameter');
        }
        Reflect.defineMetadata('event', { index: parameterIndex }, target, propertyKey);
    };
}
exports.Event = Event;
