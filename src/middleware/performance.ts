import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to log API response times
 */
export function performanceLogger(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const startTime = Date.now();

    // Listen for the response to finish
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`[${req.method} ${req.path}] Response time: ${duration}ms`);
    });

    next();
}
