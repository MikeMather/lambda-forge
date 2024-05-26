import 'reflect-metadata'
import { Inject } from '../inject.decorator'
import { inject } from 'tsyringe'

jest.mock('tsyringe')

describe('Inject Decorator', () => {
  it('should be defined', () => {
    expect(Inject).toBeDefined()
  })

  it('should call tsyringe inject', () => {
    const target = {}
    Inject(target)
    expect(inject).toBeCalledWith(target)
  })
})
