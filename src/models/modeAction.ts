import { Model, model, Schema } from 'mongoose';
import IModeActionModel from '../interfaces/modeAction/IModeActionModel';

const modeActionSchema: Schema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	modeId: { type: Schema.Types.ObjectId, required: true },
	upvote: Boolean,
	favorite: { type: Boolean, default: false }
});

modeActionSchema.index({ userId: -1, modeId: -1 });

modeActionSchema.methods.setUpvote = function() {
	return setUpvote(this._id);
};
modeActionSchema.methods.setDownvote = function() {
	return setDownvote(this._id);
};
modeActionSchema.methods.unsetVote = function() {
	return unsetVote(this._id);
};
modeActionSchema.methods.setFavorite = function() {
	return setFavorite(this._id);
};
modeActionSchema.methods.unsetFavorite = function() {
	return unsetFavorite(this._id);
};

const setUpvote = (id: typeof Schema.Types.ObjectId) =>
	ModeAction.updateOne({ _id: id }, { upvote: true }, { upsert: true, new: true }).exec();

const setDownvote = (id: typeof Schema.Types.ObjectId) =>
	ModeAction.updateOne({ _id: id }, { upvote: false }, { upsert: true, new: true }).exec();

const unsetVote = (id: typeof Schema.Types.ObjectId) =>
	ModeAction.updateOne({ _id: id }, { $unset: { upvote: '' } }, { upsert: true, new: true }).exec();

const setFavorite = (id: typeof Schema.Types.ObjectId) =>
	ModeAction.updateOne({ _id: id }, { favorite: true }, { upsert: true, new: true }).exec();

const unsetFavorite = (id: typeof Schema.Types.ObjectId) =>
	ModeAction.updateOne({ _id: id }, { favorite: false }, { upsert: true, new: true }).exec();

const ModeAction: Model<IModeActionModel> = model<IModeActionModel>('ModeAction', modeActionSchema);
export default ModeAction;
