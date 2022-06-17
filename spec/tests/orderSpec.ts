import { OrdersModel } from '../../src/models/orders';
import app from '../../src/server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { UserStore } from '../../src/models/users';

const user_i = new UserStore();
const order = new OrdersModel();

const request = supertest(app);

const newUser = {
	userName: 'testUsr',
	firstName: 'first',
	lastName: 'last',
	password: '12345678',
};

const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);

describe('Testing Orders Methods', () => {
	it('A method that get all orders', () => {
        expect(order.index).toBeDefined();
	});

    it('A method that get a specific order', () => {
        expect(order.show).toBeDefined();
    });

  it('A method that create a new order', () => {
    expect(order.create).toBeDefined();
  });
  it('A method that update data of an order', () => {
    expect(order.update).toBeDefined();
  });
  it('A method that delete an order', () => {
    expect(order.delete).toBeDefined();
  });
});
describe('Testing orders Endpoints.', () => {
	it('POST /order with a token', async () => {
		const response = await request
		  .post('/order')
		  .send({
			status: 'test',
			user_i: user_i.index(),
		  })
		  .set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
	  });
	
  it('GET /orders without a token', async () => {
    const response = await request.get('/orders');
    expect(response.status).toBe(401);
  });
  it('GET /orders with a token', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('GET /order/:id without a token ', async () => {
    const response = await request.get('/order/1');
    expect(response.status).toBe(401);
  });
  it('GET /order/:id with a token ', async () => {
    const response = await request
      .get('/order/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('POST /order without a token', async () => {
    const response = await request.post('/order').send({
      status: 'test',
      user_id: 1,
    });
    expect(response.status).toBe(401);
  });
  
  it('PUT /order without prodiving a token', async () => {
    const response = await request.put('/order').send({
      id: 1,
      status: 'update',
      user_id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('PUT /order with providing a token', async () => {
    const response = await request
      .put('/order')
      .send({
        id: 1,
        status: 'update',
        user_id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('DELETE /order without prodiving a token', async () => {
    const response = await request.delete('/order').send({
      id: 1,
    });
    expect(response.status).toBe(401);
  });

  it('DELETE /order with providing a token', async () => {
    const response = await request
      .delete('/order')
      .send({
        id: 1,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
