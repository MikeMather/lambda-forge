"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaForge = void 0;
const tsyringe_1 = require("tsyringe");
const class_validator_1 = require("class-validator");
const validation_error_1 = __importDefault(require("../errors/validation.error"));
const generic_error_1 = __importDefault(require("../errors/generic.error"));
const httpResponse_1 = require("../utils/httpResponse");
class LambdaForge {
    constructor({ services, middlewares = [] }) {
        this.container = tsyringe_1.container;
        services.forEach((service) => {
            this.container.register(service, { useClass: service });
        });
        this.middlewares = middlewares;
    }
    validationErrorFormatter(errors) {
        return errors
            .map((error) => {
            return Object.values(error.constraints);
        })
            .flat();
    }
    handleBodyInjection(bodyParameter, event) {
        if (!event.body) {
            throw new Error('Missing body in request');
        }
        const body = JSON.parse(event.body);
        const bodyType = bodyParameter.bodyType;
        const bodyInstance = new bodyType();
        Object.assign(bodyInstance, body);
        const errors = (0, class_validator_1.validateSync)(bodyInstance);
        if (errors.length > 0) {
            throw new validation_error_1.default('Validation error', this.validationErrorFormatter(errors));
        }
        else {
            return bodyInstance;
        }
    }
    validateReturn(result, returnType, returnsMany) {
        if (returnsMany) {
            if (!Array.isArray(result)) {
                throw new validation_error_1.default('Validation error', ['Expected array']);
            }
            result.forEach((item) => {
                const errors = (0, class_validator_1.validateSync)(item);
                if (errors.length > 0) {
                    throw new validation_error_1.default('Validation error', this.validationErrorFormatter(errors));
                }
            });
        }
        else {
            const errors = (0, class_validator_1.validateSync)(result);
            if (errors.length > 0) {
                throw new validation_error_1.default('Validation error', this.validationErrorFormatter(errors));
            }
        }
    }
    createHandler(HandlerClass) {
        const handlerInstance = tsyringe_1.container.resolve(HandlerClass);
        return (event, context) => __awaiter(this, void 0, void 0, function* () {
            try {
                const method = handlerInstance.main;
                const paramsMeta = Reflect.getMetadata('params', handlerInstance, 'main') || [];
                const bodyMeta = Reflect.getMetadata('body', handlerInstance, 'main');
                const queryMeta = Reflect.getMetadata('query', handlerInstance, 'main');
                const eventMeta = Reflect.getMetadata('event', handlerInstance, 'main');
                const returnType = Reflect.getMetadata('returns', handlerInstance, 'main');
                const returnStatusCode = Reflect.getMetadata('statusCode', handlerInstance, 'main');
                const returnsMany = Reflect.getMetadata('returnsMany', handlerInstance, 'main');
                const customContextMeta = Reflect.getMetadata('context', handlerInstance, 'main');
                const args = [];
                // Execute middlewares
                const customContext = {};
                for (let i = 0; i < this.middlewares.length; i++) {
                    const middleware = this.middlewares[i];
                    yield middleware.use(event, customContext, () => __awaiter(this, void 0, void 0, function* () {
                        if (i === this.middlewares.length - 1) {
                            return yield method.apply(handlerInstance, args);
                        }
                    }));
                }
                // Inject body parameter
                if (bodyMeta) {
                    args[bodyMeta.index] = this.handleBodyInjection(bodyMeta, event);
                }
                // Inject query parameters
                if (queryMeta) {
                    args[queryMeta.index] = event.queryStringParameters || {};
                }
                // Extract path parameters
                if (paramsMeta.length > 0) {
                    paramsMeta.forEach((param) => {
                        args[param.index] = event.pathParameters ? event.pathParameters[param.name] : undefined;
                    });
                }
                // Inject event object
                if (eventMeta) {
                    args[eventMeta.index] = event;
                }
                const result = yield method.apply(handlerInstance, args);
                if (returnType === undefined) {
                    return new httpResponse_1.HttpResponse(200, result).toResponse();
                }
                this.validateReturn(result, returnType, returnsMany);
                return new httpResponse_1.HttpResponse(returnStatusCode, result).toResponse();
            }
            catch (error) {
                if (error instanceof generic_error_1.default) {
                    return error.toResponse();
                }
                else {
                    console.log(error);
                    throw new generic_error_1.default('Internal server error');
                }
            }
        });
    }
}
exports.LambdaForge = LambdaForge;
