import { Service } from '../service.decorator'

const injectable = jest.fn()

jest.mock('tsyringe', () => {
  return {
    injectable: jest.fn().mockImplementation(() => injectable)
  }
})

describe('Service Decorator', () => {
  it('should be defined', () => {
    expect(Service).toBeDefined()
  })

  it('should call tsyringe injectable', () => {
    const target = {}
    Service(target)
    expect(injectable).toHaveBeenCalledWith(target)
  })
})
