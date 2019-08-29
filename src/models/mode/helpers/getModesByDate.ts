import IUserModel from '@interfaces/user/IUserModel';
import joinModeActions from '@models/mode/helpers/joinModeActions';
import Mode, { defaultProjection } from '@models/mode/mode';

const sort = { createdAt: -1 };

const getModesByDateInitial = async (user: IUserModel, quantity: number) => {
	if (user) return joinModeActions(user._id, { sort, limit: quantity, project: defaultProjection });
	return Mode.find({})
		.sort(sort)
		.limit(quantity)
		.select(defaultProjection)
		.exec();
};

const getModesByDateOffset = async (user: IUserModel, quantity: number, olderThan: string) => {
	const match = { createdAt: { $lt: olderThan } };
	if (user)
		return joinModeActions(user._id, {
			match,
			sort,
			limit: quantity,
			project: defaultProjection
		});
	return Mode.find(match)
		.sort(sort)
		.limit(quantity)
		.select(defaultProjection)
		.exec();
};

const getModesByDate = (user: IUserModel, quantity: number, olderThan?: string) => {
	if (!olderThan) return getModesByDateInitial(user, quantity);
	return getModesByDateOffset(user, quantity, olderThan);
};

export default getModesByDate;
