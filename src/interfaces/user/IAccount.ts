import IFacebook from '@interfaces/user/IFacebook';
import ILocalAccount from '@interfaces/user/ILocalAccount';

export default interface IAccount {
	local?: ILocalAccount;
	facebook?: IFacebook;
}
