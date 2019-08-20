import { Document } from 'mongoose';

import ICommentAction from '@interfaces/commentAction/ICommentAction';

export default interface IModeModel extends ICommentAction, Document {}
