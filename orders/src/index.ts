import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.JWTKEY) {
    throw new Error('JWTKEY must be defined');
  }
  if (!process.env.MONGOURI) {
    throw new Error('MONGOURI must be defined');
  }
  if (!process.env.NATSCLUSTERID) {
    throw new Error('NATSCLUSTERID must be defined');
  }
  if (!process.env.NATSURL) {
    throw new Error('NATSURL must be defined');
  }
  if (!process.env.NATSCLIENTID) {
    throw new Error('NATSCLIENTID must be defined');
  }
  try {
    await natsWrapper.connect(
      process.env.NATSCLUSTERID,
      process.env.NATSCLIENTID,
      process.env.NATSURL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
