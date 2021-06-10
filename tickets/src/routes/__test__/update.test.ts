import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('returns 404 if ticket not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'asdfasdf',
      price: 20,
    })
    .expect(404);
});

it('returns 401 if user not auth', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'asdfasdf',
      price: 20,
    })
    .expect(401);
});

it('returns 401 if user does not own ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkfj',
      price: 4,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'another title',
      price: 5,
    })
    .expect(401);
});

it('returns 400 if invalid data is sent', async () => {
  const cookieref = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookieref)
    .send({
      title: 'asldkfj',
      price: 4,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookieref)
    .send({
      title: '',
      price: 5,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookieref)
    .send({
      title: 'a good title',
      price: -2,
    })
    .expect(400);
});

it('updates ticket correctly', async () => {
  const cookieref = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookieref)
    .send({
      title: 'asldkfj',
      price: 4,
    });

  const ticketResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookieref)
    .send({
      title: 'A New Title',
      price: 5,
    })
    .expect(200);
  expect(ticketResponse.body.title).toEqual('A New Title');
  expect(ticketResponse.body.price).toEqual(5);
});

it('publishes an event', async () => {
  const cookieref = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookieref)
    .send({
      title: 'asldkfj',
      price: 4,
    });

  const ticketResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookieref)
    .send({
      title: 'A New Title',
      price: 5,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
