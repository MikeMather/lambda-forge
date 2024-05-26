import { Query } from '../query.decorator'

describe('Query Decorator', () => {
  it('should be defined', () => {
    expect(Query).toBeDefined()
  })

  it('should define query metadata', () => {
    const target = {}
    const propertyKey = 'test'
    const parameterIndex = 0

    Query()(target, propertyKey, parameterIndex)

    const metadata = Reflect.getMetadata('query', target, propertyKey)

    expect(metadata).toBeDefined()
    expect(metadata.index).toBe(parameterIndex)
  })
})
