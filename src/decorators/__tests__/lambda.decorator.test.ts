import { Lambda } from '../lambda.decorator'
import { injectable } from '@launchtray/tsyringe-async'

const mockInjectable = jest.fn()

jest.mock('@launchtray/tsyringe-async', () => {
  return {
    injectable: jest.fn().mockImplementation(() => mockInjectable)
  }
})

describe('Lambda Decorator', () => {
  it('should be defined', () => {
    expect(Lambda).toBeDefined()
  })

  it('should call tsyringe injectable', () => {
    const target = {}
    Lambda()(target)
    expect(mockInjectable).toHaveBeenCalledWith(target)
  })
})
