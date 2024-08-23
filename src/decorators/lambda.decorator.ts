import 'reflect-metadata'
import { injectable } from '@launchtray/tsyringe-async'

export function Lambda() {
  return (target: any) => injectable()(target)
}
