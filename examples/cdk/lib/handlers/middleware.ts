import { ForgeMiddleware, Request, Response, Middleware, Inject } from "lambda-forge";
import { DogsService } from "./dogs.service";
import { DbService } from "./db.service";

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

    constructor(@Inject(DbService) private dbService: DbService) {}

    async use(req: Request, res: Response, next: any) {
        next();
    }
}