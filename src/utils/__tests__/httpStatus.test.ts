import { isValidStatusCode } from '../httpStatus'

describe('httpStatus', () => {
  describe('isValidStatusCode', () => {
    it('should return true for valid HTTP status codes', () => {
      expect(isValidStatusCode(100)).toBe(true)  // Continue
      expect(isValidStatusCode(200)).toBe(true)  // OK
      expect(isValidStatusCode(301)).toBe(true)  // Moved Permanently
      expect(isValidStatusCode(404)).toBe(true)  // Not Found
      expect(isValidStatusCode(500)).toBe(true)  // Internal Server Error
      expect(isValidStatusCode(599)).toBe(true)  // Highest valid code
    })

    it('should return false for status codes below 100', () => {
      expect(isValidStatusCode(99)).toBe(false)
      expect(isValidStatusCode(0)).toBe(false)
      expect(isValidStatusCode(-1)).toBe(false)
    })

    it('should return false for status codes above 599', () => {
      expect(isValidStatusCode(600)).toBe(false)
      expect(isValidStatusCode(1000)).toBe(false)
    })

    it('should return false for NaN values', () => {
      expect(isValidStatusCode(NaN)).toBe(false)
    })
  })
})
