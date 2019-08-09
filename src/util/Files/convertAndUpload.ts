import convertToWebp from './convertToWebp';
import uploadFile from './uploadFile';

export default async (filePath: string) => {
	try {
		const convertedFilePath = await convertToWebp(filePath);
		const uploadedFilePath = await uploadFile(convertedFilePath);
		return uploadedFilePath;
	} catch (err) {
		return '';
	}
};
