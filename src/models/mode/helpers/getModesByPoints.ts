import { max } from 'lodash';
import Mode, { defaultSelection } from '../mode';

export const getModesByPoints = async (quantity: number, ids?: string[]) => {
	if (!ids)
		return Mode.find()
			.sort({ points: -1 })
			.limit(quantity)
			.select(defaultSelection)
			.exec();

	const position = await determineOffset(getPositions(ids));
	return Mode.find({})
		.limit(quantity)
		.skip(position)
		.sort({ points: -1 })
		.select(defaultSelection)
		.exec();
};

export default getModesByPoints;

const getPositions = (ids: string[]) =>
	ids.map((id) =>
		Mode.findById({ _id: id })
			.exec()
			.then((mode) => {
				return Mode.find({ points: { $gt: mode.points } })
					.sort({ points: -1 })
					.countDocuments();
			})
	);

const determineOffset = async (modePromises: any[]) => {
	const positions = await Promise.all(modePromises);
	return max(positions) + 1;
};
