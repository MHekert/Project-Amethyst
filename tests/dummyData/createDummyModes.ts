import Mode from '../../src/models/mode';

const createDummyModes = () => {
	const testArr = [
		{ date: '2019-05-27', points: 30 },
		{ date: '2019-05-27', points: 45 },
		{ date: '2019-05-27', points: 60 },
		{ date: '2019-05-28', points: 30 },
		{ date: '2019-05-28', points: 45 },
		{ date: '2019-05-28', points: 60 },
		{ date: '2019-05-29', points: 30 },
		{ date: '2019-05-29', points: 45 },
		{ date: '2019-05-29', points: 60 }
	];
	return testArr.map((el) => {
		const testmode = new Mode();
		testmode.createdAt = new Date(el.date).toISOString();
		testmode.points = el.points;
		return testmode.save();
	});
};

export default createDummyModes;