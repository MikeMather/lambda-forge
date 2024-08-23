import { initializer } from '@launchtray/tsyringe-async'

export function OnExecutionStart() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return initializer()(target, propertyKey, descriptor)
  }
}
