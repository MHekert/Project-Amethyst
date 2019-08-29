import { Document } from 'mongoose';

import IRevision from '@interfaces/mode/IRevision';

export default interface IRevisionModel extends IRevision, Document {
	insertToMode(modeId: string): any;
}
