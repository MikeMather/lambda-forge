import GenericError from './generic.error';
import { HttpResponse } from '../utils/httpResponse';
/**
 * ValidationError class
 * @extends GenericError
 * @param {string} message - Error message
 * @param {string[]} errors - Array of errors
 * @param {number} statusCode - HTTP status code
 */
export default class ValidationError extends GenericError {
    statusCode: number;
    errors: string[];
    constructor(message: string, errors: string[]);
    toResponse(): HttpResponse;
}
