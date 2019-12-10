import { isArray, isUndefined, omit, omitBy, pick } from 'lodash';
import { Document } from 'mongoose';

import getSchemaPaths from '@util/getSchemaPaths';

const cleanOne = (model: Document) => {
	if (!model._id) return model;
	const id = model._id;
	let cleanModel: any;
	if (model.schema) {
		const paths = getSchemaPaths(model.schema).filter((e) => e !== '_id');
		cleanModel = omitBy(pick(model, paths), isUndefined);
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
