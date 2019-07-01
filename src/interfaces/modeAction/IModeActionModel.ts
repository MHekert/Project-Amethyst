import IModeAction from './IModeAction';
import { Document } from 'mongoose';

export default interface IModeModel extends IModeAction, Document {
	setUpvote(): any;
	setDownvote(): any;
	unsetVote(): any;
	setFavorite(): any;
	unsetFavorite(): any;
}
