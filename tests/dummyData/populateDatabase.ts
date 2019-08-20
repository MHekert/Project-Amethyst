import { LoremIpsum } from 'lorem-ipsum';
import Mode from '../../src/models/mode/mode';
import Revision from '../../src/models/mode/revision';
import { connection } from 'mongoose';
import { MONGODB_URI } from '../../src/util/secrets';
import { random, now, times } from 'lodash';
const mongoUri: string = MONGODB_URI;
connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

const lorem = new LoremIpsum({
	wordsPerSentence: {
		max: 16,
		min: 4
	}
});

const makeCode = () => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 5; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

const insertRevisions = () =>
	times(random(1, 15), () => {
		const revision = new Revision();
		revision.code = makeCode();
		revision.body = lorem.generateSentences(random(0, 20));
		revision.changelog = times(random(10), () => lorem.generateWords(random(1, 10)));
		revision.createdAt = new Date(now() - random(31556952000)).toISOString();
		return revision;
	});

const insertMode = async () => {
	const mode = new Mode();
	mode.createdAt = new Date(now() - random(31556952000)).toISOString();
	mode.points = random(0, 10000);
	mode.favorites = random(0, 1000);
	mode.title = lorem.generateWords(random(1, 8));
	mode.tags = new Array(random(10)).fill('').map(() => lorem.generateWords(random(1, 2)));
	mode.shortDescription = lorem.generateSentences(random(0, 5));
	mode.revisions = insertRevisions();
	return await mode.save();
};

export const populateDatabase = async (quantity?: number) => {
	const count = !quantity ? 50 : quantity;
	await Promise.all(times(count, () => insertMode()));
	return process.exit(0);
};
