import dotenv from 'dotenv';
import { existsSync } from 'fs';

if (existsSync('node.env')) dotenv.config({ path: 'node.env' });
export const NODE_ENV = process.env['NODE_ENV'] || 'development';

export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const MONGODB_URI = process.env['MONGODB_URI'];
export const MONGODB_URI_TEST = process.env['MONGODB_URI_TEST'];
export const PORT = process.env['PORT'];
export const FIREBASE_IMGS_URL = process.env['FIREBASE_IMGS_URL'];

const FIREBASE_SAK_TYPE = process.env['FIREBASE_SAK_TYPE'];
const FIREBASE_SAK_PROJECT_ID = process.env['FIREBASE_SAK_PROJECT_ID'];
const FIREBASE_SAK_PRIVATE_KEY_ID = process.env['FIREBASE_SAK_PRIVATE_KEY_ID'];
const FIREBASE_SAK_PRIVATE_KEY = process.env['FIREBASE_SAK_PRIVATE_KEY'];
const FIREBASE_SAK_CLIENT_EMAIL = process.env['FIREBASE_SAK_CLIENT_EMAIL'];
const FIREBASE_SAK_CLIENT_ID = process.env['FIREBASE_SAK_CLIENT_ID'];
const FIREBASE_SAK_AUTH_URI = process.env['FIREBASE_SAK_AUTH_URI'];
const FIREBASE_SAK_TOKEN_URI = process.env['FIREBASE_SAK_TOKEN_URI'];
const FIREBASE_SAK_AUTH_PROVIDER_X509_CERT_URL =
	process.env['FIREBASE_SAK_AUTH_PROVIDER_X509_CERT_URL'];
const FIREBASE_SAK_CLIENT_X509_CERT_URL = process.env['FIREBASE_SAK_CLIENT_X509_CERT_URL'];

export const FIREBASE_SERVICEACCOUNTKEY = {
	type: FIREBASE_SAK_TYPE,
	project_id: FIREBASE_SAK_PROJECT_ID,
	private_key_id: FIREBASE_SAK_PRIVATE_KEY_ID,
	private_key: FIREBASE_SAK_PRIVATE_KEY,
	client_email: FIREBASE_SAK_CLIENT_EMAIL,
	client_id: FIREBASE_SAK_CLIENT_ID,
	auth_uri: FIREBASE_SAK_AUTH_URI,
	token_uri: FIREBASE_SAK_TOKEN_URI,
	auth_provider_x509_cert_url: FIREBASE_SAK_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: FIREBASE_SAK_CLIENT_X509_CERT_URL
};

export const FIREBASE_BUCKET = FIREBASE_SAK_PROJECT_ID + '.appspot.com';
export const FRONTEND_URL = process.env['FRONTEND_URL'];
export const FACEBOOK_APP_ID = process.env['FACEBOOK_APP_ID'];
export const FACEBOOK_APP_SECRET = process.env['FACEBOOK_APP_SECRET'];
export const FACEBOOK_CALLBACK_URL = process.env['FACEBOOK_CALLBACK_URL'];
