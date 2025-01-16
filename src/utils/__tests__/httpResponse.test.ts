import { HttpResponse } from '../httpResponse'

describe('httpResponse', () => {
  describe('constructor', () => {
    it('should create response with custom headers', () => {
      const headers = { 'content-type': 'application/json' }
      const response = new HttpResponse(200, { message: 'test' }, headers)
      expect(response.headers).toEqual(headers)
    })

    it('should handle string body', () => {
      const response = new HttpResponse(200, 'plain text')
      expect(response.body).toBe('"plain text"')
    })
  })

  describe('static methods', () => {
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
      expect(response.body).toBe('undefined')
    })

    it('should handle ok response without body', () => {
      const response = HttpResponse.ok()
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe('undefined')
    })
  })

  describe('toResponse', () => {
    it('should return APIGatewayProxyResult', () => {
      const headers = { 'content-type': 'application/json' }
      const response = new HttpResponse(200, { message: 'test' }, headers)
      const result = response.toResponse()

      expect(result).toEqual({
        statusCode: 200,
        body: '{"message":"test"}',
        headers
      })
    })
  })
})
