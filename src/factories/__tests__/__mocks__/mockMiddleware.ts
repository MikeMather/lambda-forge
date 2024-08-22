import { Request } from '../../../http/Request'
import { Response } from '../../../http/Response'
import { ForgeMiddleware } from '../../../interfaces/Middleware.interface'

export default class MockMiddleware implements ForgeMiddleware {
  async use(req: Request, res: Response, next: (error?: any) => void): Promise<void> {
    req.context.user = { id: '123' }
    next()
  }
}
