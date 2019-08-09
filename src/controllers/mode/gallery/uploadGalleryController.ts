import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, param } from 'express-validator/check';
import multer, { uploadPath } from '../../../config/multer';
import convertAndUpload from '../../../util/Files/convertAndUpload';
import { deleteFiles } from '../../../util/firebase';
import { pushGallery } from '../../../models/mode';
import { allError207, allError507, getError400 } from '../../../util/errorObjects';
import { remove } from 'fs-extra';

// TODO: replace with user authentication
const userPlaceholder = (req: Request, res: Response, next: NextFunction) => {
	req.user = '5cf2a6fded450065969652b3';
	next();
};

const router: Router = Router();

router.post(
	'/mode/:modeId',
	userPlaceholder,
	multer.array('gallery'),
	[param('modeId').isHexadecimal()],
	async (req: Request, res: Response) => {
		try {
			validationResult(req).throw();
		} catch (err) {
			return res.send(400).send(getError400);
		}

		const uploadedWebpFiles = (<Express.Multer.File[]>req.files).map(async (file) => {
			const uploadedFile = await convertAndUpload(file.path);
			remove(file.path);
			if (uploadedFile) remove(uploadPath + uploadedFile);
			return uploadedFile;
		});

		const imageNames: string[] = (await Promise.all(uploadedWebpFiles)).filter((el: string) => el);
		try {
			if (imageNames.length === 0) throw new Error('Could not uplad files');
			const pushResponse = await pushGallery(req.params.modeId, imageNames);
			if (pushResponse.nModified === 0) throw new Error('Could not save to database');
		} catch (err) {
			deleteFiles(imageNames);
			return res.status(507).send(allError507);
		}

		if (imageNames.length !== uploadedWebpFiles.length)
			return res.status(207).send({ gallery: imageNames, ...allError207 });
		return res.status(200).send({ gallery: imageNames });
	}
);

export default router;
