import { Model, model, Schema } from 'mongoose';
import IModeModel from '../interfaces/mode/IModeModel';
import { max } from 'lodash';

const { ObjectId } = Schema.Types;

const modeSchema: Schema = new Schema({
	author: ObjectId,
	title: String,
	tags: [String],
	shortDescription: String,
	thumbnail: { type: String, default: '/path/to/default.img' },
	fork: {
		modeId: ObjectId,
		revisionId: ObjectId
	},
	favorites: { type: Number, default: 0 },
	points: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now }
});

modeSchema.index({ createdAt: -1 });
modeSchema.index({ points: -1 });
modeSchema.index({ author: 1 });
modeSchema.index(
	{
		title: 'text',
		tags: 'text'
	},
	{
		weights: {
			name: 10,
			tags: 5
		},
		name: 'TextIndex'
	}
);

const updateMode = (obj: any) => (modeId: string) => Mode.updateOne({ _id: modeId }, { $inc: obj }).exec();

export const incPoints = (modeId: string, value = 1) => updateMode({ points: value })(modeId);
export const decPoints = (modeId: string, value = 1) => updateMode({ points: -value })(modeId);
export const incFavorite = (modeId: string, value = 1) => updateMode({ favorites: value })(modeId);
export const decFavorite = (modeId: string, value = 1) => updateMode({ favorites: -value })(modeId);

export const getModesByDate = (quantity: number, olderThan?: string) => {
	if (!olderThan)
		return Mode.find({})
			.sort({ createdAt: -1 })
			.limit(quantity)
			.exec();
	return Mode.find({ createdAt: { $lt: olderThan } })
		.sort({ createdAt: -1 })
		.limit(quantity)
		.exec();
};

export const getModesByPoints = async (quantity: number, ids?: string[]) => {
	if (!ids)
		return Mode.find()
			.sort({ points: -1 })
			.limit(quantity)
			.exec();

	const position = await determineOffset(getPositions(ids));
	return Mode.find({})
		.limit(quantity)
		.skip(position)
		.sort({ points: -1 })
		.exec();
};

export const getModesByAuthor = (author: string, quantity: number, offset = 0) => {
	return Mode.find({ author: author })
		.sort({ createdAt: -1 })
		.skip(offset)
		.limit(quantity)
		.exec();
};

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

const Mode: Model<IModeModel> = model<IModeModel>('Mode', modeSchema);
export default Mode;
