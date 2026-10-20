import express from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health.js';

export function createApp(clientOrigin: string) {
  const app = express();
  app.use(cors({ origin: clientOrigin }));
  app.use(express.json());

  app.use('/api/health', healthRouter);
  // TODO(you): mount /api/estimate here once the router exists (see docs/PLAN.md, milestone 2)

  return app;
}
