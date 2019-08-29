import { Document } from 'mongoose';

import ISession from '@interfaces/session/ISession';

export default interface ISessionModel extends Document, ISession {
	_id: string;
}
