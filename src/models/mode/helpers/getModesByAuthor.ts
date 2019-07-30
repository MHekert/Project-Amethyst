import Mode, { defaultSelection } from '../mode';

const getModesByAuthor = (author: string, quantity: number, offset = 0) => {
	return Mode.find({ author: author })
		.sort({ createdAt: -1 })
		.skip(offset)
		.limit(quantity)
		.select(defaultSelection)
		.exec();
};

export default getModesByAuthor;
