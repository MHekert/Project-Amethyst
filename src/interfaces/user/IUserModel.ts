import { Document } from 'mongoose';
import IUser from './IUser';
import IAccount from './IAccount';

export default interface IUserModel extends Document, IUser {
	generateHash(): string;
	validPassword(password: string): boolean;
	preSaveValidation(user: IUserModel): IUserModel;
	determineVisibleName(account: IAccount): string;
};
