import type { Express } from 'express';
import type { Server } from 'http';
import { storage } from './storage';

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'RedFlag AI Teen' });
  });

  return httpServer;
}
