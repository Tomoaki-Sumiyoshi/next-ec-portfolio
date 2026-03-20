export interface CheckoutRepository {
  get(): Promise<string | null>;
  set(id: string): Promise<void>;
  clear(): Promise<void>;
}
