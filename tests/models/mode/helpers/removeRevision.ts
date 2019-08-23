import { expect } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../../src/util/secrets';
import Mode from '../../../../src/models/mode/mode';
import { createDummyRevisions } from '../../../dummyData/dummyRevisions';
import removeRevision from '../../../../src/models/mode/helpers/removeRevision';

const mongoUri: string = MONGODB_URI_TEST;

describe(`removeRevision helper function`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return connection.close();
	});

	describe(`should correctly remove revision from mode`, () => {
		it('should', async () => {
			const mode = await createDummyRevisions();
			removeRevision(mode._id, mode.revisions[0]._id);
			const updatedModeawait = await Mode.findById(mode._id).exec();
			expect(updatedModeawait.revisions.length).to.be.equal(mode.revisions.length - 1);
		});
	});
});
