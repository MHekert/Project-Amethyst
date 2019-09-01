import { Model, model, Schema } from 'mongoose';

import IModeModel from '@interfaces/mode/IModeModel';
import { revisionSchema } from '@models/mode/revision';

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

export const defaultProjection = { __v: 0, revisions: 0 };

const updateMode = (modeId: string, obj: any) =>
	Mode.updateOne({ _id: modeId }, { $inc: obj }).exec();

export const incPoints = (modeId: string, value = 1) => updateMode(modeId, { points: value });
export const decPoints = (modeId: string, value = 1) => updateMode(modeId, { points: -value });
export const incFavorite = (modeId: string, value = 1) => updateMode(modeId, { favorites: value });
export const decFavorite = (modeId: string, value = 1) => updateMode(modeId, { favorites: -value });

export const getAuthor = async (id: string) => {
	const mode = await Mode.findById(id)
		.select({ _id: 0, author: 1 })
		.exec();
	if (mode) return mode.author;
	return null;
};

export const pushGallery = (modeId: string, newImages: string[]) =>
	Mode.updateOne({ _id: modeId }, { $push: { gallery: { $each: newImages } } }).exec();

const Mode: Model<IModeModel> = model<IModeModel>('Mode', modeSchema);
export default Mode;
