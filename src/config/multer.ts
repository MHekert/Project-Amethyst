import { tmpdir } from 'os';
import { ensureDir } from 'fs-extra';
import multer from 'multer';

export const uploadPath = tmpdir() + '/uploads/';

ensureDir(uploadPath);

const fileFilter = (req: any, file: any, cb: any) => {
	const acceptTypes = ['image/png', 'image/jpeg'];
	if (acceptTypes.some((el) => file.mimetype === el)) return cb(null, true);
	return cb(null, false);
};

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, uploadPath);
	},
	filename: function(req, file, cb) {
		cb(null, req.user + '-' + Date.now());
	}
});

const upload = multer({ storage: storage, fileFilter: fileFilter });
export default upload;
