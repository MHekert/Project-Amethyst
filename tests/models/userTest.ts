import { describe, it } from 'mocha';
import { expect } from 'chai';
import User from '../../src/models/user';
import bcrypt from 'bcrypt';

describe(`user's model tests`, () => {
	describe(`user.determineVisibleName()`, () => {
		it(`should return megaman@capcom.com`, () => {
			const user = new User();
			user.account.local.email = 'megaman@capcom.com';
			const result = user.determineVisibleName(user.account);
			expect(result).to.be.equal('megaman@capcom.com');
		});
		it(`should return Mega Man`, () => {
			const user = new User();
			user.account.facebook.name = 'Mega Man';
			const result = user.determineVisibleName(user.account);
			expect(result).to.be.equal('Mega Man');
		});
		it(`should return username`, () => {
			const user = new User();
			const result = user.determineVisibleName(user.account);
			expect(result).to.be.equal('username');
		});
	});
	describe(`user.generateHash()`, () => {
		it(`should return valid hash`, () => {
			const user = new User();
			user.account.local.password = 'passfraze';
			const hash = user.generateHash();
			const result = bcrypt.compareSync(user.account.local.password, hash);
			expect(result).to.be.equal(true);
		});
	});
	describe('user.preSaveValidation', () => {
		it('should return user with visibleName and hashed password', () => {
			const user = new User();
			user.account.local.password = 'passfraze';
			const result = user.preSaveValidation(user);
			expect(result).to
				.include({ visibleName: 'username' })
				.and.to.have.nested.property('account.local.password');
		});
	});
});
