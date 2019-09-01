import { connection } from 'mongoose';

import { MONGODB_URI, MONGODB_URI_TEST } from '@util/secrets';

export const connectDB = async (test = false) => {
	let mongoUri;
	if (test) mongoUri = MONGODB_URI_TEST;
	mongoUri = MONGODB_URI;
	return await connection.openUri(mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	});
};

export const disconnectDB = async () => await connection.close();
