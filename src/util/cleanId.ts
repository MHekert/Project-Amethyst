import { isArray, omit } from 'lodash';
import { Document } from 'mongoose';

const cleanOne = (model: Document) => {
	if (!model._id) return model;
	const id = model._id;
	let cleanModel: any;
	if (model.schema) {
		cleanModel = omit(model.toObject(), ['_id']);
	} else {
		cleanModel = omit(model, ['_id']);
	}
	cleanModel.id = id;
	return cleanModel;
};

const cleanId = (model: any) => {
	if (isArray(model)) return model.map((e: any) => cleanOne(e));
	return cleanOne(model);
};

export default cleanId;
