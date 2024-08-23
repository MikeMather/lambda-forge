import { singleton } from '@launchtray/tsyringe-async'
import { Service } from '../service.decorator'

const injectableMock = jest.fn()
const singletonMock = jest.fn()

jest.mock('@launchtray/tsyringe-async', () => {
  return {
    injectable: jest.fn().mockImplementation(() => injectableMock),
    singleton: jest.fn().mockImplementation(() => singletonMock)
  }
})

describe('Service Decorator', () => {
  it('should be defined', () => {
    expect(Service).toBeDefined()
  })

  it('should call tsyringe injectable', () => {
    const target = {}
    Service()(target)
    expect(injectableMock).toHaveBeenCalledWith(target)
  })

  it('should create a singleton if specified', () => {
    const target = {}
    Service({ singleton: true })(target)
    expect(singletonMock).toHaveBeenCalledWith(target)
  })
})
