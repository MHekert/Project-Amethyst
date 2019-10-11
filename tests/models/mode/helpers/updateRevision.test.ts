import { expect } from 'chai';
import { describe, it } from 'mocha';

import { connectDB, disconnectDB } from '@config/mongoose';
import createDummyModes from '@dummy/createDummyModes';
import updateRevision from '@models/mode/helpers/updateRevision';
import Mode from '@models/mode/mode';

describe(`mode's model helper function updateRevision`, () => {
	before(async () => connectDB(true));
	beforeEach(async () => Mode.deleteMany({}));
	after(async () => {
		await Mode.deleteMany({});
		return disconnectDB();
	});

	it('should correctly update revision with multiple changes', async () => {
		const modes = await createDummyModes();
		const mode = modes.pop();
		const revisionId = (<any>mode.revisions[0])._id;
		const changes = {
			body: 'new body',
			code: 'newcode',
			changelog: ['new changelog1', 'new changelog2']
		};
		const updatedRevision = await updateRevision(mode._id, revisionId, changes);
		const modeAfterUpdate = await Mode.findById(mode._id);
		expect(modeAfterUpdate.revisions[0]).to.deep.include(changes);
		expect(updatedRevision).to.include({ n: 1, nModified: 1, ok: 1 });
	});

	it('should correctly update revision with one change', async () => {
		const modes = await createDummyModes();
		const mode = modes.pop();
		const revisionId = (<any>mode.revisions[0])._id;
		const changes = { body: 'new body' };
		const updatedRevision = await updateRevision(mode._id, revisionId, changes);
		const modeAfterUpdate = await Mode.findById(mode._id);
		expect(modeAfterUpdate.revisions[0]).to.deep.include(changes);
		expect(updatedRevision).to.include({ n: 1, nModified: 1, ok: 1 });
	});
});
