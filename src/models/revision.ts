import mongoose, { Schema } from 'mongoose';
import IRevisionModel from '../interfaces/revision/IRevisionModel';

const revisionSchema: Schema = new Schema({
	modeId: { type: Schema.Types.ObjectId, required: true },
	changelog: [ String ],
	version: Number,
	code: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	body: { type: String, default: '' },
	gallery: [ String ]
});

revisionSchema.index({ modeId: 1 });
revisionSchema.index({ modeId: 1, version: -1 });

revisionSchema.pre<IRevisionModel>('save', async function(next) {
	this.version = await this.getNextVersionNumber();
	next();
});

revisionSchema.methods.getNextVersionNumber = function() {
	return nextVersionNumer(this.modeId);
};

const nextVersionNumer = async (modeId: Schema.Types.ObjectId) => {
	const result = await Revision.findOne({ modeId: modeId }).sort({ modeId: 1, version: -1 });
	return result && result.version ? ++result.version : 1;
};

const Revision: mongoose.Model<IRevisionModel> = mongoose.model<IRevisionModel>('Revision', revisionSchema);
export default Revision;
