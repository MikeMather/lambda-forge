import { Request } from '../../../http/Request';
import { Response } from '../../../http/Response';
import { ForgeMiddleware } from '../../../interfaces/Middleware.interface';
export default class MockMiddleware implements ForgeMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void): Promise<void>;
}
