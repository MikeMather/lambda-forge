import "reflect-metadata";
import { HttpResponse, Lambda, LambdaForge } from 'lambda-forge';

const sharedServices: any = [];
const sharedMiddleware: any = [];

export const unauthForge = new LambdaForge({
    services: sharedServices
});

export const authForge = new LambdaForge({
    services: sharedServices
});