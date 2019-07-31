import { Model, model, Schema } from 'mongoose';
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
	return setUpvote(this.userId, this.modeId);
};
modeActionSchema.methods.setDownvote = function() {
	return setDownvote(this.userId, this.modeId);
};
modeActionSchema.methods.unsetVote = function() {
	return unsetVote(this.userId, this.modeId);
};
modeActionSchema.methods.setFavorite = function() {
	return setFavorite(this.userId, this.modeId);
};
modeActionSchema.methods.unsetFavorite = function() {
	return unsetFavorite(this.userId, this.modeId);
};

const updateModeAction = (obj: any) => (userId: string, modeId: string) =>
	ModeAction.updateOne({ userId: userId, modeId: modeId }, obj, { upsert: true }).exec();

export const setUpvote = updateModeAction({ upvote: true });

export const setDownvote = updateModeAction({ upvote: false });

export const unsetVote = updateModeAction({ $unset: { upvote: '' } });

export const setFavorite = updateModeAction({ favorite: true });

export const unsetFavorite = updateModeAction({ $unset: { favorite: '' } });

const ModeAction: Model<IModeActionModel> = model<IModeActionModel>('ModeAction', modeActionSchema);
export default ModeAction;
