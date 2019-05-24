import IAccount from './IAccount';
import ISuspension from './ISuspension';
import { Schema } from 'mongoose';

const Id = Schema.Types.ObjectId;

export default interface IUser {
	visibleName: string;
	account: IAccount;
	suspension?: ISuspension;
};
