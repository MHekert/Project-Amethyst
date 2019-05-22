import mongoose, { Schema } from 'mongoose';
import IModeModel from '../interfaces/mode/IModeModel';

const modeSchema: Schema = new Schema({
	author: mongoose.Schema.Types.ObjectId,
	title: String,
	tags: [ String ],
	shortDescription: String,
	thumbnail: String,
	fork: {
		modeId: mongoose.Schema.Types.ObjectId,
		revisionId: mongoose.Schema.Types.ObjectId
	},
	favorites: Number,
	points: Number,
	created: Date,
	lastUpdated: Date,
	lastVersion: mongoose.Schema.Types.ObjectId
});

modeSchema.post('validate', (mode: IModeModel, next) => {
	mode = mode.setDefaults(mode);
	next();
});

modeSchema.post('save', (mode) => {});

modeSchema.methods.setDefaults = (mode: IModeModel) => {
	const date = new Date();
	mode.created = mode.created === '' || mode.created === undefined ? date.toISOString() : mode.created;
	mode.lastUpdated = date.toISOString();
	mode.favorites = mode.favorites === 0 || mode.favorites === undefined ? 0 : mode.favorites;
	mode.points = mode.favorites === 0 || mode.favorites === undefined ? 0 : mode.points;
	mode.thumbnail = mode.thumbnail === '' || mode.thumbnail === undefined ? 'defaultPath' : mode.thumbnail;
	return mode;
};

const Mode: mongoose.Model<IModeModel> = mongoose.model<IModeModel>('Mode', modeSchema);
export default Mode;
