import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orderController';

const router = Router();

/**
 * POST /api/orders - Create a new order
 */
router.post('/orders', createOrder);

/**
 * GET /api/orders - Get all historic orders
 */
router.get('/orders', getOrders);

export default router;
