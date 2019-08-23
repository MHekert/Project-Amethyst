import { min } from 'lodash';
import IUserModel from '../../../../src/interfaces/user/IUserModel';
import Mode, { defaultProjection } from '../mode';
import joinModeActions from './joinModeActions';

const sort = { points: -1 };

const getPoints = async (ids: string[]) => {
	const modes = await Mode.find({ _id: { $in: ids } }).exec();
	const points = modes.map((el) => el.points);
	return min(points);
};

const getModesByPointsInitial = async (user: IUserModel, quantity: number) => {
	if (user) return joinModeActions(user._id, { sort: sort, limit: quantity, project: defaultProjection });
	return Mode.find()
		.sort(sort)
		.limit(quantity)
		.select(defaultProjection)
		.exec();
};

const getModesByPointsOffset = async (user: IUserModel, quantity: number, ids: string[]) => {
	const points = await getPoints(ids);
	const match = { points: { $lt: points } };
	if (user)
		return joinModeActions(user._id, {
			match: match,
			sort: sort,
			limit: quantity,
			project: defaultProjection
		});
	return Mode.find(match)
		.sort(sort)
		.limit(quantity)
		.select(defaultProjection)
		.exec();
};

const getModesByPoints = async (user: IUserModel, quantity: number, ids?: string[]) => {
	if (!ids) return getModesByPointsInitial(user, quantity);
	return getModesByPointsOffset(user, quantity, ids);
};

export default getModesByPoints;
