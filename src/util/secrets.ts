import dotenv from 'dotenv';
import { existsSync } from 'fs';

if (existsSync('node.env')) dotenv.config({ path: 'node.env' });
export const isDev: boolean = JSON.parse(process.env.ISDEV);
export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const MONGODB_URI =
	process.env.NODE_ENV === 'test' ? process.env['MONGODB_URI_TEST'] : process.env['MONGODB_URI'];
export const PORT = process.env['PORT'];
