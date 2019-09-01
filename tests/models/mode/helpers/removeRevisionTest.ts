import { expect } from 'chai';
import { describe, it } from 'mocha';
import { connection } from 'mongoose';

import { createDummyRevisions } from '@dummy/dummyRevisions';
import removeRevision from '@models/mode/helpers/removeRevision';
import Mode from '@models/mode/mode';
import { MONGODB_URI_TEST } from '@util/secrets';

const mongoUri: string = MONGODB_URI_TEST;

describe(`removeRevision helper function`, () => {
	before(async () => connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true }));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return connection.close();
	});

	it('should correctly remove revision from mode', async () => {
		const mode = await createDummyRevisions();
		removeRevision(mode._id, mode.revisions[0]._id);
		const updatedModeawait = await Mode.findById(mode._id).exec();
		expect(updatedModeawait.revisions.length).to.be.equal(mode.revisions.length - 1);
	});
});
