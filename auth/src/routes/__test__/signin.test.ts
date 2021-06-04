import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

it('returns a 400 when email does not exists', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'me@testcom',
      password: 'paasdfasdf',
    })
    .expect(400);
});

it('returns a 400 when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'valid@test.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'valid@test.com',
      password: 'paasdfasdf',
    })
    .expect(400);
});

it('responds with a valid cookie with successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'valid@test.com',
      password: 'password',
    })
    .expect(201);
  const req = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'valid@test.com',
      password: 'password',
    })
    .expect(200);
  expect(req.get('Set-Cookie').toString().length).toBeGreaterThan(90);
});
