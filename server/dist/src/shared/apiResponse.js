/**
 * Send success response
 */
export const sendSuccess = (res, data, message = 'Operation successful', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
/**
 * Send error response
 */
export const sendError = (res, message, errors, statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};
//# sourceMappingURL=apiResponse.js.map