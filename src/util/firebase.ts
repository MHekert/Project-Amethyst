import { bucket } from '../config/firebase';
import { basename } from 'path';

export const uploadFile = (filePath: string, destinationDir = 'images/') =>
	bucket.upload(filePath, {
		metadata: { contentType: 'image/webp' },
		destination: destinationDir + basename(filePath)
	});

export const deleteFile = (fileName: string, destinationDir = 'images/') =>
	bucket.file(destinationDir + fileName).delete();

export const deleteFiles = (fileNames: string[], destinationDir = 'images/') =>
	fileNames.forEach((el) => deleteFile(el, destinationDir));
