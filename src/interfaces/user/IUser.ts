import IAccount from '@interfaces/user/IAccount';
import ISuspension from '@interfaces/user/ISuspension';

export default interface IUser {
	visibleName: string;
	account: IAccount;
	suspension?: ISuspension;
}
