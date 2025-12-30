import { OrderRequest, OrderResponse, StockOrder } from '../types';
import { DEFAULT_STOCK_PRICE, SHARE_DECIMAL_PRECISION } from '../config/constants';
import { getNextExecutionDate, formatDate } from './dateService';
import { memoryStore } from '../storage/memoryStore';
import { v4 as uuidv4 } from 'uuid';

function validatePortfolio(request: OrderRequest): void {
    const totalAllocation = request.portfolio.stocks.reduce(
        (sum, stock) => sum + stock.allocation,
        0
    );

    if (Math.abs(totalAllocation - 100) > 0.01) {
        throw new Error(
            `Portfolio allocations must sum to 100%. Current total: ${totalAllocation}%`
        );
    }

    if (request.totalAmount <= 0) {
        throw new Error('Total amount must be greater than 0');
    }

    if (request.portfolio.stocks.length === 0) {
        throw new Error('Portfolio must contain at least one stock');
    }
}

function roundToDecimals(value: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
}

export function splitOrder(request: OrderRequest): OrderResponse {
    validatePortfolio(request);

    const orders: StockOrder[] = request.portfolio.stocks.map(stock => {
        const stockPrice = stock.price || DEFAULT_STOCK_PRICE;
        const amount = (request.totalAmount * stock.allocation) / 100;
        const quantity = roundToDecimals(
            amount / stockPrice,
            SHARE_DECIMAL_PRECISION
        );

        return {
            symbol: stock.symbol,
            amount: roundToDecimals(amount, 2),
            quantity,
            price: stockPrice
        };
    });

    const executionDate = getNextExecutionDate();

    const response: OrderResponse = {
        orderId: uuidv4(),
        orderType: request.orderType,
        totalAmount: request.totalAmount,
        orders,
        executionDate: formatDate(executionDate),
        timestamp: new Date().toISOString()
    };

    memoryStore.saveOrder(response);

    return response;
}

export function getHistoricOrders(): OrderResponse[] {
    return memoryStore.getAllOrders();
}
