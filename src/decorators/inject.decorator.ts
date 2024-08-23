import { inject } from '@launchtray/tsyringe-async'

export function Inject(token: any): any {
  return inject(token)
}
