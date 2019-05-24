import { Schema } from 'mongoose';

const Id = Schema.Types.ObjectId;

export default interface ICommentAction {
	userId: typeof Id;
	commentId: typeof Id;
	upvote: Boolean;
};
