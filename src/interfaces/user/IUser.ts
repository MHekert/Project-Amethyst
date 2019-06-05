import IAccount from './IAccount';
import ISuspension from './ISuspension';

export default interface IUser {
	visibleName: string;
	account: IAccount;
	suspension?: ISuspension;
}
