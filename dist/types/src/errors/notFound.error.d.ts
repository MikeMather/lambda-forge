import GenericError from './generic.error';
export default class NotFoundError extends GenericError {
    constructor(message: string);
}
