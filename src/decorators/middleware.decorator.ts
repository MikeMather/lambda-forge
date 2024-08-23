import 'reflect-metadata'
import { injectable } from '@launchtray/tsyringe-async'

export function Middleware(target: any) {
  return injectable()(target)
}
