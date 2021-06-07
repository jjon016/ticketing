import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWTKEY) {
    throw new Error('JWTKEY must be defined');
  }
  if (!process.env.MONGOURI) {
    throw new Error('MONGOURI must be defined');
  }
  try {
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
