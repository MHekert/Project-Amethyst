import { Document } from 'mongoose';
import IUser from './IUser';

export default interface IUserModel extends Document, IUser {
	generateHash(): string;
	validPassword(password: string): boolean;
}
