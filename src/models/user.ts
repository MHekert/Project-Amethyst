import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import IUserModel from '../interfaces/user/IUserModel';
import IAccount from '../interfaces/user/IAccount';

const Id = Schema.Types.ObjectId;

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
	return bcrypt.hashSync(this.account.local.password, bcrypt.genSaltSync(8));
};
userSchema.methods.validPassword = function(password: string) {
	return bcrypt.compareSync(password, this.account.local.password);
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
