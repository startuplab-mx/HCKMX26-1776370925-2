import { placeholder, type Placeholder, type InsertPlaceholder } from '@shared/schema';

export interface IStorage {
  getPlaceholder(id: number): Promise<Placeholder | undefined>;
}

export class MemStorage implements IStorage {
  async getPlaceholder(id: number): Promise<Placeholder | undefined> {
    return undefined;
  }
}

export const storage = new MemStorage();
