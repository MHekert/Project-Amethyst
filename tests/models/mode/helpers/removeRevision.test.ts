import { expect } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import { createDummyRevisions } from '@dummy/dummyRevisions';
import removeRevision from '@models/mode/helpers/removeRevision';
import Mode from '@models/mode/mode';

describe(`removeRevision helper function`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	it('should correctly remove revision from mode', async () => {
		const mode = await createDummyRevisions();
		removeRevision(mode._id, mode.revisions[0]._id);
		const updatedModeawait = await Mode.findById(mode._id).exec();
		expect(updatedModeawait.revisions.length).to.be.equal(mode.revisions.length - 1);
	});
});
