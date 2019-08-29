import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

import IAccount from '@interfaces/user/IAccount';
import IUserModel from '@interfaces/user/IUserModel';

const userSchema: Schema = new Schema({
	visibleName: String,
	account: {
		local: {
			email: String,
			password: String
		},
		facebook: {
			id: String,
			token: String,
			email: String,
			name: String
		}
	},
	suspension: {
		isBanned: Boolean,
		expirationDate: Date,
		isPermanent: Boolean
	}
});

userSchema.methods.generateHash = function() {
	return hashSync(this.account.local.password, genSaltSync(8));
};
userSchema.methods.validPassword = function(password: string) {
	return compareSync(password, this.account.local.password);
};

userSchema.post('validate', (user: IUserModel, next) => {
	user = user.preSaveValidation(user);
	next();
});

userSchema.methods.determineVisibleName = (account: IAccount) => {
	if (account.facebook.name) return account.facebook.name;
	if (account.local.email) return account.local.email;
	return 'username';
};

userSchema.methods.preSaveValidation = (user: IUserModel) => {
	if (user.visibleName === undefined) user.visibleName = user.determineVisibleName(user.account);
	if (user.account.local.password) user.account.local.password = user.generateHash();
	return user;
};

const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('User', userSchema);
export default User;
