import 'reflect-metadata'
import { injectable, singleton as Singleton } from '@launchtray/tsyringe-async'

// export function Service(target: any) {
//   return injectable()(target)
// }

export function Service({ singleton = false }: { singleton?: boolean } = {}) {
  return function (target: any) {
    return singleton ? Singleton()(target) : injectable()(target)
  }
}
