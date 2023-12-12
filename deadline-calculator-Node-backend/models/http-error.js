class HttpError extends Error {
    message;
    code;

    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}

module.exports = HttpError;