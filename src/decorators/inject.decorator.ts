import { inject } from 'tsyringe'

export function Inject(target: any) {
  return inject(target)
}
