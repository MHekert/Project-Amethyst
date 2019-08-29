import { Document } from 'mongoose';

import IMode from '@interfaces/mode/IMode';

export default interface IModeModel extends Document, IMode {
	upvote(): any;
	downvote(): any;
	incFavorite(): any;
	decFavorite(): any;
}
