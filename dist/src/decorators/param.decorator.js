"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = void 0;
require("reflect-metadata");
// This decorator is used to inject a parameter from the path parameters of the request
function Param(paramName, pipes) {
    return (target, propertyKey, parameterIndex) => {
        if (propertyKey === undefined) {
            throw new Error('Param decorator can only be used on a method parameter');
        }
        if (pipes && !Array.isArray(pipes)) {
            throw new Error('Transformers must be an array of functions');
        }
        if (pipes && pipes.some((t) => typeof t !== 'function')) {
            throw new Error('Transformers must be functions');
        }
        const existingParamPipes = Reflect.getMetadata('paramPipes', target, propertyKey) || [];
        const newPipes = pipes ? pipes.map((pipe) => ({ index: parameterIndex, transform: pipe })) : [];
        Reflect.defineMetadata('paramPipes', [...existingParamPipes, ...newPipes], target, propertyKey);
        const existingParams = Reflect.getMetadata('params', target, propertyKey) || [];
        existingParams.push({ index: parameterIndex, name: paramName });
        Reflect.defineMetadata('params', existingParams, target, propertyKey);
    };
}
exports.Param = Param;
