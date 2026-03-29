import { Order, OrderRequestParam } from '../types/order';

export interface OrderRepository {
  list(): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  set(orderRequest: OrderRequestParam): Promise<Order>;
  clear(): Promise<void>;
}
