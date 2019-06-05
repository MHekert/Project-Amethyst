import mongoose from 'mongoose';

export default (model: mongoose.Model<any>) => {
	const paths: string[] = [];
	model.schema.eachPath((path: string) => {
		paths.push(path);
	});
	return paths;
};
