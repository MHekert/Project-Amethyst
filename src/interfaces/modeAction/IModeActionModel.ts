import IModeAction from './IModeAction';
import { Document } from 'mongoose';

export default interface IModeModel extends IModeAction, Document {
	setUpvote(): IModeAction;
	setDownvote(): IModeAction;
	unsetVote(): IModeAction;
	setFavorite(): IModeAction;
	unsetFavorite(): IModeAction;
}
