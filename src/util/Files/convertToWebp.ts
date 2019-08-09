import * as webp from 'webp-converter';

export default (file: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		webp.cwebp(file, `${file}.webp`, '-q 50', (status: number, error: Error) => {
			if (status == 100) return resolve(`${file}.webp`);
			return reject(error);
		});
	});
};
