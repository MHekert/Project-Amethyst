import { Request, Response, Router } from 'express';
import { param } from 'express-validator/check';
import { remove } from 'fs-extra';

import multer, { uploadPath } from '@config/multer';
import validateRequest from '@controllers/middleware/validateRequest';
import { pushGallery } from '@models/mode/mode';
import { allError207, allError507 } from '@util/errorObjects';
import convertAndUpload from '@util/files/convertAndUpload';
import { deleteFiles } from '@util/firebase';

const router: Router = Router();

router.post(
	'/:modeId',
	[param('modeId').isHexadecimal()],
	validateRequest,
	multer.array('gallery'),
	async (req: Request, res: Response) => {
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
