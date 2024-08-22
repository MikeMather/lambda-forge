import { ForgeMiddleware, Request, Response, Middleware, Inject } from "lambda-forge";
import { DogsService } from "./dogs.service";

@Middleware
export class CorsMiddleware implements ForgeMiddleware {
    async use(req: Request, res: Response, next: any) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    }
}

@Middleware
export class ExampleMiddleware implements ForgeMiddleware {

    constructor(@Inject(DogsService) private dogService: DogsService) {}

    async use(req: Request, res: Response, next: any) {
        const first = this.dogService.getFirstDog();
        req.context.firstDog = first;
        res.setHeader('X-First-Dog', first.breed);
        next();
    }
}