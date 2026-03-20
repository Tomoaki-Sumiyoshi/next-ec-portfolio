import { v4 } from 'uuid';

import { OrderRepository } from './OrderRepository';
import {
  OrderArraySchema,
  OrderRequestParamSchema,
} from '../schemas/order.schema';
import { Order, OrderRequestParam } from '../types/order';

const STORAGE_KEY = 'portfolio_ec_order';

function readStorage(): Order[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return OrderArraySchema.parse(parsed);
  } catch {
    return [];
  }
}

function writeStorage(orderList: Order[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orderList));
}

function removeStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export class LocalStorageOrderRepository implements OrderRepository {
  async list(): Promise<Order[]> {
    return readStorage();
  }

  async getById(id: string): Promise<Order | null> {
    return readStorage().find((order) => order.id === id) ?? null;
  }

  async set(param: OrderRequestParam): Promise<Order> {
    const newOrder: Order = {
      id: v4(),
      createdAt: new Date().toISOString(),
      ...OrderRequestParamSchema.parse(param),
    };

    writeStorage([...readStorage(), newOrder]);
    return newOrder;
  }

  async clear(): Promise<void> {
    removeStorage();
  }
}
