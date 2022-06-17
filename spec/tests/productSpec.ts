import { ProductStore } from '../../src/models/products';
import { UserStore } from '../../src/models/users';
import supertest from 'supertest';
import app from '../../src/server';
import db from '../../src/database';

const userStore = new UserStore();
const productStore = new ProductStore();
const request = supertest(app);
let userToken = '';

describe('Product Model', () => {
	describe('Test methods exist', () => {
		it('Index method should exist', () => {
			expect(productStore.index).toBeDefined();
		});

		it('Show method should exist', () => {
			expect(productStore.show).toBeDefined();
		});

		it('Create method should exist', () => {
			expect(productStore.create).toBeDefined();
		});

		it('Edit method should exist', () => {
			expect(productStore.edit).toBeDefined();
		});

		it('Delete method should exist', () => {
			expect(productStore.delete).toBeDefined();
		});
	});

	describe('Test methods return correct values', () => {
		it('Create method should return  Product', async () => {
			const result = await productStore.create({
				name: 'nike',
				price: 99.99,
				category: 'shoe'
			});
			expect(result).toEqual(
				jasmine.objectContaining({
					name: 'nike',
					price: '99.99',
					category: 'shoe'
				})
			);
		});

		it('Index method should return array of users with testUser in it', async () => {
			const result = await productStore.index();
			expect(result).toEqual([
				jasmine.objectContaining({
					name: 'nike'
				})
			]);
		});

		it('Show method should return nike when called with ID', async () => {
			const result = await productStore.show(1);
			expect(result).toEqual(
				jasmine.objectContaining({
					name: 'nike'
				})
			);
		});

		it('Edit method should return a product with edited properties', async () => {
			const result = await productStore.edit({
				id: 1,
				name: 'nike',
				price: 99.99,
				category: 'shoe'
			});
			expect(result).toEqual(
				jasmine.objectContaining({
					price: '99.99'
				})
			);
		});

		it('Delete method should return', async () => {
			const result = await productStore.delete(1);
			expect(result).toEqual(
				jasmine.objectContaining({
					name: 'nike'
				})
			);
		});
	});

	describe('Test API Endpoints', () => {
		beforeAll(async () => {
			await userStore.create({
				userName: 'testUserProduct',
				firstName: 'Test',
				lastName: 'User',
				password: 'test123'
			});

			await productStore.create({
				name: 'nike',
				price: 99.99,
				category: 'shoe'
			});
		});

		afterAll(async () => {
			const conn = await db.connect();
			const sql =
				'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
			await conn.query(sql);
			conn.release();
		});

		it('Check if server runs, should return 200 status', async () => {
			const response = await request.get('/');
			expect(response.status).toBe(200);
		});

		it('Authenticate user and get token', async () => {
			const response = await request
				.post('/users/authenticate')
				.set('Content-type', 'application/json')
				.send({
					userName: 'testUserProduct',
					password: 'test123'
				});
			expect(response.status).toBe(200);

			userToken = response.body;
		});

		it('Test Index should return products array ', async () => {
			const response = await request
				.get('/products')
				.set('Authorization', 'Bearer ' + userToken);
			expect(response.status).toBe(200);
			expect(response.body).toEqual([
				jasmine.objectContaining({
					name: 'nike'
				})
			]);
		});

		it('Test Show should return product', async () => {
			const response = await request
				.get('/products/2')
				.set('Authorization', 'Bearer ' + userToken);
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				jasmine.objectContaining({
					name: 'nike'
				})
			);
		});

		it('Test Create should return created Product', async () => {
			const response = await request
				.post('/products')
				.set('Authorization', 'Bearer ' + userToken)
				.send({
					name: 'newB',
					price: 99.99,
					category: 'shoe'
				});
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				jasmine.objectContaining({
					name: 'newB'
				})
			);
		});

		it('Test edit should edited User', async () => {
			const response = await request
				.patch('/products/2')
				.set('Authorization', 'Bearer ' + userToken)
				.send({
					id: 3,
					name: 'newB',
					price: 199.95,
					category: 'shoe'
				});
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				jasmine.objectContaining({
					price: '199.95'
				})
			);
		});

		it('Test delete should delete Product', async () => {
			const response = await request
				.delete('/products')
				.set('Authorization', 'Bearer ' + userToken)
				.send({
					id: 3
				});
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				jasmine.objectContaining({
					name: 'newB'
				})
			);
		});
	});
});
