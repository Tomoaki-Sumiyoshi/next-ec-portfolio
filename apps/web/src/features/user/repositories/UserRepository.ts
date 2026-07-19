export interface UserRepository {
  getId(): Promise<string | null>;
  setId(userId: string): Promise<string>;
}
