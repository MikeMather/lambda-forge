import { Lambda } from '../lambda.decorator'
import { injectable } from 'tsyringe'

const mockInjectable = jest.fn()

jest.mock('tsyringe', () => {
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
    Lambda(target)
    expect(mockInjectable).toBeCalledWith(target)
  })
})
