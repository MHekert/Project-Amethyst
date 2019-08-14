import dotenv from 'dotenv';
import { existsSync } from 'fs';

if (existsSync('node.env')) dotenv.config({ path: 'node.env' });
export const isDev: boolean = JSON.parse(process.env.ISDEV);

export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const MONGODB_URI = process.env['MONGODB_URI'];
export const MONGODB_URI_TEST = process.env['MONGODB_URI_TEST'];
export const PORT = process.env['PORT'];
export const FRONTEND_URL = process.env['FRONTEND_URL'];
export const FACEBOOK_APP_ID = process.env['FACEBOOK_APP_ID'];
export const FACEBOOK_APP_SECRET = process.env['FACEBOOK_APP_SECRET'];
export const FACEBOOK_CALLBACK_URL = process.env['FACEBOOK_CALLBACK_URL'];
