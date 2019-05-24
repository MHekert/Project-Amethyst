import mongoose, { Schema } from 'mongoose';
import IModeModel from '../interfaces/mode/IModeModel';

const modeSchema: Schema = new Schema({
	author: Schema.Types.ObjectId,
	title: String,
	tags: [ String ],
	shortDescription: String,
	thumbnail: { type: String, default: '/path/to/default.img' },
	fork: {
		modeId: Schema.Types.ObjectId,
		revisionId: Schema.Types.ObjectId
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

export const upvote = (modeId: typeof Schema.Types.ObjectId) =>
	Mode.updateOne({ _id: modeId }, { $inc: { points: 1 } }).exec();

export const downvote = (modeId: typeof Schema.Types.ObjectId) =>
	Mode.updateOne({ _id: modeId }, { $inc: { points: -1 } }).exec();

export const incFavorite = (modeId: typeof Schema.Types.ObjectId) =>
	Mode.updateOne({ _id: modeId }, { $inc: { favorites: 1 } }).exec();

export const decFavorite = (modeId: typeof Schema.Types.ObjectId) =>
	Mode.updateOne({ _id: modeId }, { $inc: { favorites: -1 } }).exec();

const Mode: mongoose.Model<IModeModel> = mongoose.model<IModeModel>('Mode', modeSchema);
export default Mode;
