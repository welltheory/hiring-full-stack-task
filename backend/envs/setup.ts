// Setup for tests
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env.test');
dotenv.config({ path: envPath });

// Fallback to .env if .env.test doesn't exist
if (!process.env.DATABASE_URL) {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

export {};
