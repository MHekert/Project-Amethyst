import Mode from '../../src/models/mode/mode';

const revisions = [{ code: 'code1' }, { code: 'code2' }, { code: 'code3' }];
const modes = [
	{ createdAt: '2019-05-27', points: 30, author: '507f1f77bcf86cd799439011', revisions: revisions },
	{ createdAt: '2019-05-27', points: 45, author: '507f1f77bcf86cd799439011', revisions: revisions },
	{ createdAt: '2019-05-27', points: 60, author: '507f1f77bcf86cd799439011', revisions: revisions },
	{ createdAt: '2019-05-28', points: 30, author: '507f1f77bcf86cd799439011', revisions: revisions },
	{ createdAt: '2019-05-28', points: 45, author: '507f1f77bcf86cd799439011', revisions: revisions },
	{ createdAt: '2019-05-28', points: 60, author: '107f1f77bcf86cd799439011', revisions: revisions },
	{ createdAt: '2019-05-29', points: 30, author: '107f1f77bcf86cd799439011', revisions: revisions },
	{ createdAt: '2019-05-29', points: 45, author: '107f1f77bcf86cd799439011', revisions: revisions },
	{ createdAt: '2019-05-29', points: 60, author: '107f1f77bcf86cd799439011', revisions: revisions }
];

const createDummyModes = () => {
	const modesToSave = modes.map((el: any) => {
		el.createdAt = new Date(el.createdAt).toISOString();
		return el;
	});
	return Mode.create(modesToSave);
};

export default createDummyModes;
