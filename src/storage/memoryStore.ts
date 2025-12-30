import { HistoricOrder } from '../types';

class MemoryStore {
    private orders: HistoricOrder[] = [];

    saveOrder(order: HistoricOrder): void {
        this.orders.push(order);
    }

    getAllOrders(): HistoricOrder[] {
        return [...this.orders];
    }

    clearOrders(): void {
        this.orders = [];
    }

    getOrderCount(): number {
        return this.orders.length;
    }
}

export const memoryStore = new MemoryStore();
