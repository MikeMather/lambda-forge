import GenericError from './generic.error'

export class NotFoundError extends GenericError {
  constructor(message: string) {
    super('NotFoundError', 404, message)
  }
}

export class BadRequestError extends GenericError {
  constructor(message: string) {
    super('BadRequestError', 400, message)
  }
}

export class UnauthorizedError extends GenericError {
  constructor(message: string) {
    super('UnauthorizedError', 401, message)
  }
}

export class ForbiddenError extends GenericError {
  constructor(message: string) {
    super('ForbiddenError', 403, message)
  }
}

export class InternalServerError extends GenericError {
  constructor(message: string) {
    super('InternalServerError', 500, message)
  }
}

export class ServiceUnavailable extends GenericError {
  constructor(message: string) {
    super('ServiceUnavailable', 503, message)
  }
}

export class ConflictError extends GenericError {
  constructor(message: string) {
    super('ConflictError', 409, message)
  }
}

export class UnprocessableEntityError extends GenericError {
  constructor(message: string) {
    super('UnprocessableEntityError', 422, message)
  }
}
