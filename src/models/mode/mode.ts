import { Model, model, Schema } from 'mongoose';
import IModeModel from '../../interfaces/mode/IModeModel';
import { revisionSchema } from './revision';

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
	gallery: [String],
	revisions: [revisionSchema],
	actualCode: String
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

modeSchema.pre<IModeModel>('save', async function(next) {
	if (this.revisions.length > 0) this.actualCode = this.revisions[this.revisions.length - 1].code;
	next();
});

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

export const defaultSelection = { __v: 0, revisions: 0 };

const updateMode = (obj: any) => (modeId: string) => Mode.updateOne({ _id: modeId }, { $inc: obj }).exec();

const upvote = updateMode({ points: 1 });
const downvote = updateMode({ points: -1 });
const incFavorite = updateMode({ favorites: 1 });
const decFavorite = updateMode({ favorites: -1 });

const Mode: Model<IModeModel> = model<IModeModel>('Mode', modeSchema);
export default Mode;
