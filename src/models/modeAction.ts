import { Model, model, Schema, Types } from 'mongoose';
import IModeActionModel from '../interfaces/modeAction/IModeActionModel';

const { ObjectId } = Schema.Types;

const modeActionSchema: Schema = new Schema({
	userId: { type: ObjectId, required: true },
	modeId: { type: ObjectId, required: true },
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

const updateModeAction = (obj: any) => (id: string) => ModeAction.updateOne({ _id: id }, obj, { upsert: true }).exec();

const setUpvote = updateModeAction({ upvote: true });

const setDownvote = updateModeAction({ upvote: false });

const unsetVote = updateModeAction({ $unset: { upvote: '' } });

const setFavorite = updateModeAction({ favorite: true });

const unsetFavorite = updateModeAction({ favorite: false });

const ModeAction: Model<IModeActionModel> = model<IModeActionModel>('ModeAction', modeActionSchema);
export default ModeAction;
