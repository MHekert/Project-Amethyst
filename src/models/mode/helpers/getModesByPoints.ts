import { max } from 'lodash';
import IUserModel from '../../../../src/interfaces/user/IUserModel';
import Mode, { defaultProjection } from '../mode';
import joinModeActions from './joinModeActions';

const sort = { points: -1 };

const getPositions = (ids: string[]) =>
	ids.map((id) =>
		Mode.findById({ _id: id })
			.exec()
			.then((mode) => {
				return Mode.find({ points: { $gt: mode.points } })
					.sort(sort)
					.countDocuments();
			})
	);

const determineOffset = async (posisionsPromises: Promise<number>[]) => {
	const positions = await Promise.all(posisionsPromises);
	return max(positions) + 1;
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
	const position = await determineOffset(getPositions(ids));
	if (user)
		return joinModeActions(user._id, { sort: sort, limit: quantity, project: defaultProjection, skip: position });
	return Mode.find({})
		.sort(sort)
		.skip(position)
		.limit(quantity)
		.select(defaultProjection)
		.exec();
};

const getModesByPoints = async (user: IUserModel, quantity: number, ids?: string[]) => {
	if (!ids) return getModesByPointsInitial(user, quantity);
	return getModesByPointsOffset(user, quantity, ids);
};

export default getModesByPoints;
