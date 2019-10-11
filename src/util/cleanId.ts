import { isArray, omit } from 'lodash';

const cleanOne = (model: any) => {
	if (!model._id) return model;
	const id = model._id;
	const cleanModel = omit(model, ['_id']);
	cleanModel.id = id;
	return <any>cleanModel;
};

const cleanId = (model: any) => {
	if (isArray(model)) return model.map((e: any) => cleanOne(e));
	return cleanOne(model);
};

export default cleanId;
