import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtestcom',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@testcom',
      password: 'pa',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '',
    })
    .expect(400);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: '',
      password: 'asdkfjasdf',
    })
    .expect(400);
});

it('does not allow same email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@test.com',
      password: 'asdkfjasdf',
    })
    .expect(201);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test2@test.com',
      password: 'asdkfjasdf',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const req = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test3@test.com',
      password: 'password',
    })
    .expect(201);
  expect(req.get('Set-Cookie').toString().length).toBeGreaterThan(90);
});
