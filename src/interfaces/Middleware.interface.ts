import { Request } from '../http/Request'
import { Response } from '../http/Response'

export interface ForgeMiddleware {
  use: (req: Request, res: Response, next: (error?: any) => void) => Promise<void>
}
