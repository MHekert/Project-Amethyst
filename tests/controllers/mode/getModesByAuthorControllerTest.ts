process.env.NODE_ENV = 'test';
import { describe, it } from 'mocha';
import { expect, request, use } from 'chai';
import { connection } from 'mongoose';
import { MONGODB_URI_TEST } from '../../../src/util/secrets';
import chaiHttp from 'chai-http';
import { isArray } from 'lodash';
import app, { server } from '../../../src/server';
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

	describe(`/mode/author/:author/:quantity/:offset`, () => {
		describe(`with correct parameters`, () => {
			it(`should return array and status code 200`, (done) => {
				request(app)
					.get('/mode/author/507f1f77bcf86cd799439011/10/10')
					.end((err, res) => {
						expect(res).have.status(200);
						expect(isArray(res.body)).to.equal(true);
						done();
					});
			});
		});
		describe(`with correct parameters (without optional offset)`, () => {
			it(`should return array and status code 200`, (done) => {
				request(app)
					.get('/mode/author/507f1f77bcf86cd799439011/10')
					.end((err, res) => {
						expect(res).have.status(200);
						expect(isArray(res.body)).to.equal(true);
						done();
					});
			});
		});
		describe(`with string in quantity's place`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get('/mode/author/123123/wrong_param/10')
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});
		describe(`with wrong offset param`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get('/mode/author/123123/10/wrong_param')
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});
		describe(`with wrong author param`, () => {
			it(`should return message and status code 400`, (done) => {
				request(app)
					.get('/mode/author/wrong_param/10/10')
					.end((err, res) => {
						expect(res).have.status(400);
						expect(res.body).to.be.deep.equal(getError400);
						done();
					});
			});
		});

		describe(`with wrong params number`, () => {
			it(`should return message and status code 404`, (done) => {
				request(app)
					.get('/mode/author/wrong_param/10/10/something_else')
					.end((err, res) => {
						expect(res).have.status(404);
						done();
					});
			});
		});
	});
});
