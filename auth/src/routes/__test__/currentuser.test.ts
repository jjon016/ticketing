import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  const req = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
  const cookie = req.get('Set-Cookie');
  const res = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(res.body.currentUser.email).toEqual('test@test.com');
});
