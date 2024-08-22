import 'reflect-metadata'
import { injectable } from 'tsyringe'

export function Middleware(target: any) {
  return injectable()(target)
}
