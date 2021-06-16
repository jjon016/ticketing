import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () => {
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

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
  }
};

start();
