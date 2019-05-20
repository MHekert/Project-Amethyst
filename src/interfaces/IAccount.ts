import ILocalAccount from './ILocalAccount';
import IFacebook from './IFacebook';

export default interface IAccount {
	local?: ILocalAccount;
	facebook?: IFacebook;
}
