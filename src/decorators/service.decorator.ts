import 'reflect-metadata'
import { injectable } from 'tsyringe'

export function Service(target: any) {
  return injectable()(target)
}
