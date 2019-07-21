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
	createdAt: { type: Date, default: Date.now },
	gallery: [String]
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

modeSchema.methods.upvote = function() {
	return upvote(this._id);
};
modeSchema.methods.downvote = function() {
	return downvote(this._id);
};
modeSchema.methods.incFavorite = function() {
	return incFavorite(this._id);
};
modeSchema.methods.decFavorite = function() {
	return decFavorite(this._id);
};
modeSchema.methods.pushGallery = function(images: string[]) {
	return pushGallery(this._id, images);
};

const updateMode = (obj: any) => (modeId: string) => Mode.updateOne({ _id: modeId }, { $inc: obj }).exec();

const upvote = updateMode({ points: 1 });
const downvote = updateMode({ points: -1 });
const incFavorite = updateMode({ favorites: 1 });
const decFavorite = updateMode({ favorites: -1 });

export const pushGallery = (modeId: string, newImages: string[]) =>
	Mode.updateOne({ _id: modeId }, { $push: { gallery: { $each: newImages } } }).exec();

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
