import Mode from '../../src/models/mode/mode';

const createDummyModes = () => {
	const testArr = [
		{ date: '2019-05-27', points: 30, author: '507f1f77bcf86cd799439011' },
		{ date: '2019-05-27', points: 45, author: '507f1f77bcf86cd799439011' },
		{ date: '2019-05-27', points: 60, author: '507f1f77bcf86cd799439011' },
		{ date: '2019-05-28', points: 30, author: '507f1f77bcf86cd799439011' },
		{ date: '2019-05-28', points: 45, author: '507f1f77bcf86cd799439011' },
		{ date: '2019-05-28', points: 60, author: '107f1f77bcf86cd799439011' },
		{ date: '2019-05-29', points: 30, author: '107f1f77bcf86cd799439011' },
		{ date: '2019-05-29', points: 45, author: '107f1f77bcf86cd799439011' },
		{ date: '2019-05-29', points: 60, author: '107f1f77bcf86cd799439011' }
	];
	return testArr.map((el) => {
		const testmode = new Mode();
		testmode.createdAt = new Date(el.date).toISOString();
		testmode.points = el.points;
		testmode.author = el.author;
		return testmode.save();
	});
};

export default createDummyModes;
