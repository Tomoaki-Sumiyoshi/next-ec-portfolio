import { Order, OrderRequestParam } from '../types/order';

export interface OrderRepository {
  list(userId: string): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  set(orderRequest: OrderRequestParam, userId: string): Promise<Order>;
}
