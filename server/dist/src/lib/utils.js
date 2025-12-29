/**
 * Utility functions
 */
/**
 * Remove undefined properties from an object
 * Useful for exactOptionalPropertyTypes compatibility
 * Converts null to undefined for optional properties
 */
export function removeUndefined(obj) {
    const result = {};
    for (const key in obj) {
        const value = obj[key];
        if (value !== undefined && value !== null) {
            result[key] = value;
        }
        else if (value === null) {
            // Keep null values as they are explicitly set
            result[key] = null;
        }
    }
    return result;
}
//# sourceMappingURL=utils.js.map