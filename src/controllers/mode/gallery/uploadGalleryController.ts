import { remove } from 'fs-extra';
import { basename } from 'path';
import fileType from 'file-type';
import imagemin from 'imagemin';
import { Router, Request, Response, NextFunction } from 'express';
import multer, { uploadPath } from '../../../config/multer';
import { imageminOptions, minifiedPath } from '../../../config/imagemin';
import { bucket } from '../../../config/firebase';
import { pushGallery } from '../../../models/mode';

// TODO: replace with user authentication
const userPlaceholder = (req: Request, res: Response, next: NextFunction) => {
	req.user = '5cf2a6fded450065969652b3';
	next();
};

const router: Router = Router();

router.post('/mode/:modeId', userPlaceholder, multer.array('gallery'), async (req: Request, res: Response) => {
	const files: any = req.files;
	const minifiedFiles = await imagemin([`${uploadPath}${req.user}-*`], imageminOptions);

	const uploadedFiles = minifiedFiles.map((file: any) => {
		return bucket.upload(file.destinationPath, {
			metadata: { contentType: fileType(file.data).mime },
			destination: 'images/' + basename(file.destinationPath)
		});
	});

	files.forEach((file: any) => remove(file.path));
	uploadedFiles.forEach(async (uploadedFile) => remove(minifiedPath + (await uploadedFile)[0].metadata.name));

	const filesNames = uploadedFiles.map(async (uploadedFile) => basename((await uploadedFile)[0].metadata.name));
	const imageNames = await Promise.all(filesNames);
	await pushGallery(req.params.modeId, imageNames);
	res.status(200).send({ gallery: imageNames });
});

export default router;
