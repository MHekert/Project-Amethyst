import { Document } from 'mongoose';

import IAccount from '@interfaces/user/IAccount';
import IUser from '@interfaces/user/IUser';

export default interface IUserModel extends Document, IUser {
	generateHash(): string;
	validPassword(password: string): boolean;
	preSaveValidation(user: IUserModel): IUserModel;
	determineVisibleName(account: IAccount): string;
}
