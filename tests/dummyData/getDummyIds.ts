import createDummyModes from '@dummy/createDummyModes';

const getDummyIds = async () => {
	const dummyModes = await Promise.all(createDummyModes());
	return dummyModes.map((el) => el._id);
};
export default getDummyIds;
