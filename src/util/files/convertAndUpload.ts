import convertToWebp from '@util/files/convertToWebp';
import uploadFile from '@util/files/uploadFile';

export default async (filePath: string) => {
	try {
		const convertedFilePath = await convertToWebp(filePath);
		const uploadedFilePath = await uploadFile(convertedFilePath);
		return uploadedFilePath;
	} catch (err) {
		return null;
	}
};
