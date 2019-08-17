import { Document } from 'mongoose';
import ISession from './ISession';

export default interface ISessionModel extends Document, ISession {
	_id: string;
}
