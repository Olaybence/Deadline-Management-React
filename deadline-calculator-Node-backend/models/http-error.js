class HttpError extends Error {
    message;
    code;

    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

module.exports = HttpError;