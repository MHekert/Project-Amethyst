process.env.NODE_ENV = 'test';
import { expect, request, use } from 'chai';
import { connection, Types } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import ModeAction from '../../../src/models/modeAction';
import app from '../../../src/server';
const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

const id = Types.ObjectId();

describe(`POST on path /mode/action/downvote`, () => {
	before(async () => {
		return connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	beforeEach(async () => {
		return ModeAction.deleteMany({});
	});
	after(async () => {
		await ModeAction.deleteMany({});
		return connection.close();
	});

	it('should return error 400 while no modeId in body', (done) => {
		request(app)
			.post('/mode/action/downvote')
			.set('content-type', 'application/json')
			.send({})
			.end((err, res) => {
				expect(res).have.status(400);
				expect(res.body.error).to.have.property('message', 'Wrong params in body');
				expect(res.body.error).to.have.property('status', 400);
				done();
			});
	});

	it('should return status code 200', (done) => {
		request(app)
			.post('/mode/action/downvote')
			.set('content-type', 'application/json')
			.send({ modeId: id })
			.end((err, res) => {
				expect(res).have.status(200);
				done();
			});
	});
});
