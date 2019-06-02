import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('node.env')) dotenv.config({ path: 'node.env' });
export const isDev: boolean = JSON.parse(process.env.ISDEV);
export const SESSION_SECRET = isDev ? process.env['SESSION_SECRET_LOCAL'] : process.env['SESSION_SECRET'];
export const MONGODB_URI =
	process.env.NODE_ENV === 'test'
		? process.env['MONGODB_URI_TEST']
		: isDev ? process.env['MONGODB_URI_LOCAL'] : process.env['MONGODB_URI'];
export const PORT = isDev ? process.env['PORT_LOCAL'] : process.env['PORT'];
