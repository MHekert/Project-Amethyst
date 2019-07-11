import { describe, it } from 'mocha';
import { expect, request, use } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import { isArray } from 'lodash';
import app, { server } from '../../../src/server';
import getDummyIds from '../../dummyData/getDummyIds';
import Mode from '../../../src/models/mode';
import IModeModel from '../../../src/interfaces/mode/IModeModel';
import { getError400 } from '../../../src/util/errorObjects';
const mongoUri: string = MONGODB_URI_TEST;
use(chaiHttp);

describe(`GET on path`, () => {
	before(async () => {
		return connection.openUri(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
	});
	after(async () => {
		server.close();
		return connection.close();
	});

	describe(`/mode/new`, () => {
		describe(`/:quantity with number in quantity's place`, () => {
			it(`should return array and status code 200`, (done) => {
				request(app)
					.get('/mode/new/10')
					.end((err, res) => {
						expect(res).have.status(200);
						expect(isArray(res.body)).to.equal(true);
						done();
					});
			});
		});
		describe(`/:quantity with sting quantity's place`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get('/mode/new/wrong_param')
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});
		describe(`/:quantity/:date with correct params`, () => {
			it(`should return array and status code 200`, (done) => {
				request(app)
					.get('/mode/new/10/2019-05-28T16:55:56.496Z')
					.end((err, res) => {
						expect(res).have.status(200);
						expect(isArray(res.body)).to.equal(true);
						done();
					});
			});
		});
		describe(`/:quantity/:date with wrong quantity param`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get('/mode/new/wrong_param/2019-05-28T16:55:56.496Z')
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});
		describe(`/:quantity/:date with wrong date param`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get('/mode/new/10/2019-05-2')
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});

		describe(`/:quantity/:date/ with wrong params number`, () => {
			it(`should return message and status code 404`, (done) => {
				request(app)
					.get('/mode/new/10/2019-05-28T16:55:56.496Z/something_else')
					.end((err, res) => {
						expect(res).have.status(404);
						done();
					});
			});
		});
	});
});
