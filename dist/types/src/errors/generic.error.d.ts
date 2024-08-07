import { HttpResponse } from '../utils/httpResponse';
export default class GenericError extends Error {
    statusCode: number;
    constructor(message: string);
    toResponse(): HttpResponse;
}
