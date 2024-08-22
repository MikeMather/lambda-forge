import 'reflect-metadata';
import { ForgeMiddleware } from '../interfaces/Middleware.interface';
export declare function UseMiddlewares(middlewares: (new (...args: any[]) => ForgeMiddleware)[]): MethodDecorator;
