import { Document } from 'mongoose';

import IComment from '@interfaces/comment/IComment';

export default interface IModeModel extends IComment, Document {}
