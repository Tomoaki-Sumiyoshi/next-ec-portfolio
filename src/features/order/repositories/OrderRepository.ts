import { Order, OrderRequestParam } from '../types/order';

export interface OrderRepository {
  list(): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  set(param: OrderRequestParam): Promise<Order>;
  clear(): Promise<void>;
}
