import { Schema } from 'mongoose';

const getSchemaPaths = (schema: Schema<any>) => {
	const paths: string[] = [];
	schema.eachPath((path: string) => paths.push(path));
	return paths;
};

export default getSchemaPaths;
