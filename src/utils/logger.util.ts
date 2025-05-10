export const logInfo = (message: string, other: any = {}) => console.log(`[LOG] ${message}`, other);

export const logError = (message: string, error: any = {}) => console.error(`[ERROR] ${message}`, error);
