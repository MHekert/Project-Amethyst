import { Model, model, Schema } from 'mongoose';

import IRevisionModel from '@interfaces/mode/IRevisionModel';
import pushRevision from '@models/mode/helpers/pushRevision';

export const revisionSchema: Schema = new Schema({
	changelog: [String],
	code: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	body: { type: String, default: '' }
});

revisionSchema.methods.insertToMode = function(modeId: string) {
	return pushRevision(modeId, this);
};

const Revision: Model<IRevisionModel> = model<IRevisionModel>('Revision', revisionSchema);
export default Revision;
