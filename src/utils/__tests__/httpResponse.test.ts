import { HttpResponse } from '../httpResponse'

describe('httpResponse', () => {
  it('should return a 200 status code', () => {
    const response = HttpResponse.ok({ message: 'success' })
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('{"message":"success"}')
  })

  it('should return a 201 status code', () => {
    const response = HttpResponse.created({ message: 'created' })
    expect(response.statusCode).toBe(201)
    expect(response.body).toBe('{"message":"created"}')
  })

  it('should return a 204 status code', () => {
    const response = HttpResponse.noContent()
    expect(response.statusCode).toBe(204)
    expect(response.body).toBeUndefined()
  })
})
