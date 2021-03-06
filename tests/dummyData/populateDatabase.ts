import { now, random, times } from 'lodash';
import { LoremIpsum } from 'lorem-ipsum';
import { Types } from 'mongoose';

import { connectDB } from '@config/mongoose';
import Mode from '@models/mode/mode';
import Revision from '@models/mode/revision';

const { ObjectId } = Types;

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

const generateRevisions = () =>
	times(random(1, 15), () => {
		const revision = new Revision();
		revision.code = makeCode();
		revision.body = lorem.generateSentences(random(0, 20));
		revision.changelog = times(random(10), () => lorem.generateWords(random(1, 10)));
		revision.createdAt = new Date(now() - random(31556952000)).toISOString();
		return revision;
	});

const generateMode = () => {
	const mode = new Mode();
	mode.author = new ObjectId().toHexString();
	mode.createdAt = new Date(now() - random(31556952000)).toISOString();
	mode.points = random(0, 10000);
	mode.favorites = random(0, 1000);
	mode.title = lorem.generateWords(random(1, 8));
	mode.tags = times(random(10), () => lorem.generateWords(random(1, 2)));
	mode.shortDescription = lorem.generateSentences(random(0, 5));
	mode.revisions = generateRevisions();
	return mode;
};

export const populateDatabase = async (quantity?: number) => {
	await connectDB(false);
	const count = !quantity ? 50 : quantity;
	const modes = times(count, generateMode);
	await Mode.create(modes);
	return process.exit(0);
};
