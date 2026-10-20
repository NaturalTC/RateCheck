import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/ratecheck'),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
});

export const env = EnvSchema.parse(process.env);
