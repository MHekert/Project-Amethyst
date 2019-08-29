import { Model, model, Schema } from 'mongoose';

import ISessionModel from '@interfaces/session/ISessionModel';

const { ObjectId } = Schema.Types;

const sessionchema: Schema = new Schema({
	_id: String,
	session: {
		lastAccess: Date,
		cookie: {
			originalMaxAge: Date,
			expires: Date,
			secure: Boolean,
			httpOnly: Boolean,
			path: String,
			domain: String,
			sameSite: String
		},
		passport: {
			user: ObjectId
		}
	},
	expires: Date
});

const Session: Model<ISessionModel> = model<ISessionModel>('Session', sessionchema);
export default Session;
