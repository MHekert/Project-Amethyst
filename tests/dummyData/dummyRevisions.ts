import { series } from 'async';
import Revision from '../../src/models/revision';

export const modeId = '5cf2a6fded450065969652b3';

export default () => {
	const testArr = Array(15).fill(async (call: any) => {
		const testRevision = new Revision();
		testRevision.modeId = modeId;
		testRevision.code = 'testCodeValue';
		await testRevision.save();
		call();
	});

	return new Promise((resolve) => {
		series(testArr, (err, res) => {
			resolve(true);
		});
	});
};
