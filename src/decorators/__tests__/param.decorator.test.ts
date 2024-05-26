import { Param } from '../param.decorator'

describe('Param Decorator', () => {
  it('should be defined', () => {
    expect(Param).toBeDefined()
  })

  it('should define param metadata', () => {
    const target = {}
    const propertyKey = 'test'
    const parameterIndex = 0

    Param('test')(target, propertyKey, parameterIndex)

    const metadata = Reflect.getMetadata('params', target, propertyKey)

    expect(metadata).toBeDefined()
    expect(metadata[0].index).toBe(parameterIndex)
    expect(metadata[0].name).toBe('test')
  })
})
