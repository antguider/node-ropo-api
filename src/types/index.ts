export enum OrderType {
    BUY = 'BUY',
    SELL = 'SELL'
}

export interface StockAllocation {
    symbol: string;
    allocation: number;
    price?: number;
}

export interface ModelPortfolio {
    stocks: StockAllocation[];
}

export interface OrderRequest {
    portfolio: ModelPortfolio;
    totalAmount: number;
    orderType: OrderType;
}

export interface StockOrder {
    symbol: string;
    amount: number;
    quantity: number;
    price: number;
}

export interface OrderResponse {
    orderId: string;
    orderType: OrderType;
    totalAmount: number;
    orders: StockOrder[];
    executionDate: string;
    timestamp: string;
}

export interface HistoricOrder extends OrderResponse {
}
