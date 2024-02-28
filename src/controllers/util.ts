export const ensureError = (error: Error | unknown) => {
    if (error instanceof Error) return error;
    return new Error(String(error));
};
