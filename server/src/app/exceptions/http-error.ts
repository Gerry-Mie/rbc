export class HttpError extends Error {
    constructor( message: string, public code: string, public status: number = 400) {
        super(message);
    }
}

export class NotFoundError extends HttpError{
    constructor(message: string, code: string) {
        super(message, code, 404);
    }
}
export class BadRequestError extends HttpError{
    constructor(message: string, code: string) {
        super(message, code, 400);
    }
}


