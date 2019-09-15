import { connection } from 'mongoose';

import { MONGODB_URI, MONGODB_URI_TEST } from '@util/secrets';

export const connectDB = async (test = false) => {
	const mongoUri = test ? MONGODB_URI_TEST : MONGODB_URI;
	return await connection.openUri(mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	});
};

export const disconnectDB = async () => await connection.close();
