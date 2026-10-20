import { createApp } from './app.js';
import { connectDb } from './db.js';
import { env } from './config/env.js';

await connectDb(env.MONGODB_URI);
createApp(env.CLIENT_ORIGIN).listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT}`);
});
