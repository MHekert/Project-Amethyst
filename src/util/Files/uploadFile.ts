import { basename } from 'path';
import { uploadFile } from '../firebase';

export default async (filePath: string): Promise<string> => {
	try {
		const uploadedFile = await uploadFile(filePath);
		if (uploadedFile[0] && uploadedFile[0].metadata && uploadedFile[0].metadata.name) {
			return basename(uploadedFile[0].metadata.name);
		} else {
			throw new Error('failed to upload');
		}
	} catch (err) {
		throw err;
	}
};
