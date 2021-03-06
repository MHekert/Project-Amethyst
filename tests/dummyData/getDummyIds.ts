import createDummyModes from '@dummy/createDummyModes';

const getDummyIds = async () => {
	const dummyModes = await createDummyModes();
	return dummyModes.map((el: any) => el._id);
};
export default getDummyIds;
