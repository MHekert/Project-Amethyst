import Mode, { defaultSelection } from '../mode';

const getModesByDate = (quantity: number, olderThan?: string) => {
	if (!olderThan)
		return Mode.find({})
			.sort({ createdAt: -1 })
			.limit(quantity)
			.select(defaultSelection)
			.exec();
	return Mode.find({ createdAt: { $lt: olderThan } })
		.sort({ createdAt: -1 })
		.limit(quantity)
		.select(defaultSelection)
		.exec();
};

export default getModesByDate;
