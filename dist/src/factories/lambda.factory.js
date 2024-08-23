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
const Request_1 = require("../http/Request");
const Response_1 = require("../http/Response");
class LambdaForge {
    constructor({ services, middlewares = [] }) {
        this.container = tsyringe_1.container;
        this.services = services;
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
    handleBodyInjection(bodyParameter, req) {
        if (!req.body) {
            throw new Error('Missing body in request');
        }
        const bodyType = bodyParameter.bodyType;
        const bodyInstance = new bodyType();
        Object.assign(bodyInstance, req.body);
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
    executeMiddlewares(req, res, middlewares) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const Middleware of middlewares) {
                yield new Promise((resolve, reject) => {
                    const middlewareInstance = this.container.resolve(Middleware);
                    middlewareInstance.use(req, res, (error) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve();
                        }
                    });
                });
            }
        });
    }
    // runs the preExecution method of all services
    runPreExecutionHooks() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const service of this.services) {
                if (service.prototype.beforeExecution) {
                    const serviceInstance = this.container.resolve(service);
                    yield serviceInstance.beforeExecution();
                }
            }
        });
    }
    createHandler(HandlerClass) {
        const handlerInstance = tsyringe_1.container.resolve(HandlerClass);
        return (event, context) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.runPreExecutionHooks();
                const request = new Request_1.Request(event);
                const response = new Response_1.Response();
                const method = handlerInstance.main;
                const paramsMeta = Reflect.getMetadata('params', handlerInstance, 'main') || [];
                const paramsPipesMeta = Reflect.getMetadata('paramPipes', handlerInstance, 'main') || [];
                const bodyMeta = Reflect.getMetadata('body', handlerInstance, 'main');
                const queryMeta = Reflect.getMetadata('query', handlerInstance, 'main');
                const eventMeta = Reflect.getMetadata('event', handlerInstance, 'main');
                const returnType = Reflect.getMetadata('returns', handlerInstance, 'main');
                const returnStatusCode = Reflect.getMetadata('statusCode', handlerInstance, 'main');
                const returnsMany = Reflect.getMetadata('returnsMany', handlerInstance, 'main');
                const requestMeta = Reflect.getMetadata('request', handlerInstance, 'main');
                const middlewares = Reflect.getMetadata('middlewares', handlerInstance, 'main') || [];
                const args = [];
                // Inject body parameter
                if (bodyMeta) {
                    args[bodyMeta.index] = this.handleBodyInjection(bodyMeta, request);
                }
                // Inject query parameters
                if (queryMeta) {
                    args[queryMeta.index] = request.query || {};
                }
                // Extract path parameters and run through pipe functions if any
                if (paramsMeta.length > 0) {
                    paramsMeta.forEach((param) => {
                        const pipes = paramsPipesMeta.filter((pipe) => pipe.index === param.index);
                        let value = request.params[param.name];
                        if (pipes.length > 0) {
                            pipes.forEach((pipe) => {
                                value = pipe.transform(value);
                            });
                        }
                        args[param.index] = value;
                    });
                }
                // Inject raw event object
                if (eventMeta) {
                    args[eventMeta.index] = event;
                }
                yield this.executeMiddlewares(request, response, [...this.middlewares, ...middlewares]);
                // Inject request object after middleware
                if (requestMeta) {
                    args[requestMeta.index] = request;
                }
                const result = yield method.apply(handlerInstance, args);
                if (returnType === undefined) {
                    response.statusCode = 200;
                    response.body = JSON.stringify(result);
                    return response.send();
                }
                this.validateReturn(result, returnType, returnsMany);
                response.statusCode = returnStatusCode;
                response.body = JSON.stringify(result);
                return response.send();
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
