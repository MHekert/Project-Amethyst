import IMode from './IMode';
import { Document } from 'mongoose';

export default interface IModeModel extends Document, IMode {
	upvote(): any;
	downvote(): any;
	incFavorite(): any;
	decFavorite(): any;
}
