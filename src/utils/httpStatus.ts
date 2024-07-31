export const isValidStatusCode = (statusCode: number): boolean => {
  if (isNaN(statusCode)) {
    return false
  }
  if (statusCode < 100 || statusCode > 599) {
    return false
  }
  return true
}
