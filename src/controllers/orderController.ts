import { Request, Response } from 'express';
import { OrderRequest } from '../types';
import { splitOrder, getHistoricOrders } from '../services/orderService';

/**
 * Controller for handling order-related requests
 */

/**
 * POST /api/orders
 * Create a new order and split it across portfolio stocks
 */
export async function createOrder(req: Request, res: Response): Promise<void> {
    try {
        const orderRequest: OrderRequest = req.body;

        // Validate request body
        if (!orderRequest.portfolio || !orderRequest.totalAmount || !orderRequest.orderType) {
            res.status(400).json({
                error: 'Missing required fields: portfolio, totalAmount, orderType'
            });
            return;
        }

        // Process the order
        const result = splitOrder(orderRequest);

        res.status(201).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                error: error.message
            });
        } else {
            res.status(500).json({
                error: 'An unexpected error occurred'
            });
        }
    }
}

/**
 * GET /api/orders
 * Retrieve all historic orders
 */
export async function getOrders(_req: Request, res: Response): Promise<void> {
    try {
        const orders = getHistoricOrders();

        res.status(200).json({
            total: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to retrieve orders'
        });
    }
}
