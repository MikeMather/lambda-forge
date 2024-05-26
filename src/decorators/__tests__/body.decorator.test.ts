import { Body } from '../body.decorator'

class TestDto {}

describe('Body Decorator', () => {
  it('should be defined', () => {
    expect(Body).toBeDefined()
  })

  it('should define body metadata', () => {
    const target = {}
    const propertyKey = 'test'
    const parameterIndex = 0

    Body(TestDto)(target, propertyKey, parameterIndex)

    const metadata = Reflect.getMetadata('body', target, propertyKey)

    expect(metadata).toBeDefined()
    expect(metadata.index).toBe(parameterIndex)
    expect(metadata.bodyType).toBe(TestDto)
  })
})
