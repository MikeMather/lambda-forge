import 'reflect-metadata'
import { Inject } from '../inject.decorator'
import { inject } from '@launchtray/tsyringe-async'

jest.mock('@launchtray/tsyringe-async')

describe('Inject Decorator', () => {
  it('should be defined', () => {
    expect(Inject).toBeDefined()
  })

  it('should call tsyringe inject', () => {
    const token = 'MockService'
    const target = {}
    Inject(token)
    expect(inject).toHaveBeenCalledWith(token)
  })
})
