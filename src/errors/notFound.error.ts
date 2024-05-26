import GenericError from './generic.error'

export default class NotFoundError extends GenericError {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}
