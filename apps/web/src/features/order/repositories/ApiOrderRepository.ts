import { API_ENDPOINTS } from '@/shared/api/endpoints';

import { OrderArraySchema, OrderSchema } from '../schemas/order.schema';

import type { OrderRepository } from './OrderRepository';
import type { Order, OrderRequestParam } from '../types/order';

export class ApiOrderRepository implements OrderRepository {
  async list(userId: string): Promise<Order[]> {
    return this.fetchOrders({ userId });
  }

  async getById(id: string): Promise<Order | null> {
    const orderList = await this.fetchOrders({ id });
    return orderList[0] ?? null;
  }

  async set(
    orderRequest: OrderRequestParam,
    userId: string
  ): Promise<Order> {
    const response = await fetch(API_ENDPOINTS.orders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...orderRequest, userId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status}`);
    }

    return OrderSchema.parse(await response.json());
  }

  private async fetchOrders(
    filter: { userId: string } | { id: string }
  ): Promise<Order[]> {
    const searchParams = new URLSearchParams(filter);
    const response = await fetch(
      `${API_ENDPOINTS.orders}?${searchParams.toString()}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    return OrderArraySchema.parse(await response.json());
  }
}
