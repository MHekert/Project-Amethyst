import { LoremIpsum } from 'lorem-ipsum';
import Mode from '../../src/models/mode';
import Revision from '../../src/models/revision';
import { connection } from 'mongoose';
import { MONGODB_URI } from '../../src/util/secrets';
import { random, now } from 'lodash';
const mongoUri: string = MONGODB_URI;
connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

const lorem = new LoremIpsum({
	wordsPerSentence: {
		max: 16,
		min: 4
	}
});

export const populateDatabase = async (quantity?: number) => {
	const count = !quantity ? 50 : quantity;
	await Promise.all(new Array(count).fill('').map(() => insertMode()));
	return process.exit(0);
};

const insertMode = async () => {
	const mode = new Mode();
	mode.createdAt = new Date(now() - random(31556952000)).toISOString();
	mode.points = random(0, 10000);
	mode.favorites = random(0, 1000);
	mode.title = lorem.generateWords(random(1, 8));
	mode.tags = new Array(random(10)).fill('').map(() => lorem.generateWords(random(1, 2)));
	mode.shortDescription = lorem.generateSentences(random(0, 5));
	await mode.save();
	return await insertRevisions(mode._id);
};

const insertRevisions = (modeId: string) => {
	const revisions = new Array(random(1, 15)).fill('').map(() => {
		const revision = new Revision();
		revision.code = makeCode();
		revision.body = lorem.generateSentences(random(0, 20));
		revision.changelog = new Array(random(10)).fill('').map(() => lorem.generateWords(random(1, 10)));
		revision.modeId = modeId;
		return revision.save();
	});
	return Promise.all(revisions);
};

const makeCode = () => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 5; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};
