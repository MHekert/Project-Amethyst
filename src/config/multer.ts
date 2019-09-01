import { Request } from 'express';
import { ensureDir } from 'fs-extra';
import multer from 'multer';
import { tmpdir } from 'os';

export const uploadPath = tmpdir() + '/uploads/';

ensureDir(uploadPath);

const fileFilter = (req: Request & { failed: boolean }, file: Express.Multer.File, cb: any) => {
	const acceptTypes = ['image/png', 'image/jpeg'];
	if (acceptTypes.some((el) => file.mimetype === el)) return cb(null, true);
	req.failed = true;
	return cb(null, false);
};

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, uploadPath),
	filename: (req: Request, _file, cb) => cb(null, req.user._id + '-' + Date.now())
});

const upload = multer({ storage, fileFilter });

export default upload;
