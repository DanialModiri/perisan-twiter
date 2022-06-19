import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorResponseException extends HttpException {
    constructor(
        public statusCode: HttpStatus,
        public errorCode: string,
        public message: string
    ) {
        super({
            statusCode,
            errorCode,
            message
        }, statusCode)
    }
}