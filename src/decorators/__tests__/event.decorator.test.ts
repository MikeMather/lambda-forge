import { Event } from '../event.decorator'

describe('Event Decorator', () => {
  it('should be defined', () => {
    expect(Event).toBeDefined()
  })

  it('should define event metadata', () => {
    const target = {}
    const propertyKey = 'test'
    const parameterIndex = 0

    Event()(target, propertyKey, parameterIndex)

    const metadata = Reflect.getMetadata('event', target, propertyKey)

    expect(metadata).toBeDefined()
    expect(metadata.index).toBe(parameterIndex)
  })
})
