"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
require("reflect-metadata");
function Event(target, propertyKey, parameterIndex) {
    Reflect.defineMetadata('event', { index: parameterIndex }, target, propertyKey);
}
exports.Event = Event;
