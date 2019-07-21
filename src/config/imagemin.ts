import { tmpdir } from 'os';
import { ensureDir } from 'fs-extra';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

export const minifiedPath = tmpdir() + '/mimified/';

ensureDir(minifiedPath);

export const imageminOptions: any = {
	destination: minifiedPath,
	plugins: [
		imageminJpegtran(),
		imageminPngquant({
			quality: [0.6, 0.8]
		})
	]
};
