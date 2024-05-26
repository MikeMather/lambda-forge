import 'reflect-metadata';
import { injectable } from 'tsyringe';

export function Lambda(target: any) {
  return injectable()(target);
}
