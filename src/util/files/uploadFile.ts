import { basename } from 'path';

import { uploadFile } from '@util/firebase';

export default async (filePath: string): Promise<string> => {
	try {
		const uploadedFile = (await uploadFile(filePath))[0];
		if (uploadedFile && uploadedFile.metadata && uploadedFile.metadata.name) {
			return basename(uploadedFile.metadata.name);
		} else {
			throw new Error('failed to upload');
		}
	} catch (err) {
		throw err;
	}
};
