import IAccount from './IAccount';
import ISuspension from './ISuspension';
import { Schema } from 'mongoose';

const Id = Schema.Types.ObjectId;

export default interface IUser {
	visibleName: string;
	submittedModes: typeof Id[];
	favoriteModes: typeof Id[];
	likedModes: typeof Id[];
	dislikedModes: typeof Id[];
	account: IAccount;
	suspension?: ISuspension;
}
