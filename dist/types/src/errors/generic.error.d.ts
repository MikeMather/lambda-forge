import { HttpResponse } from '../utils/httpResponse';
export default class GenericError extends Error {
    statusCode: number;
    constructor(name: string, statusCode: number, message: string);
    toResponse(): HttpResponse;
}
