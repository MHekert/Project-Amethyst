import { Model } from 'mongoose';

const getModelPaths = (model: Model<any>) => {
	const paths: string[] = [];
	model.schema.eachPath((path: string) => {
		paths.push(path);
	});
	return paths;
};

export default getModelPaths;