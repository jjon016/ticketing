import { OrderCreatedEvent, OrderStatus } from '@fadecoding/common';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Order } from '../../../models/order';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const data: OrderCreatedEvent['data']={
    id: mongoose.Types.ObjectId().toHexString(),
    version:0,
    expiresAt:'jjasd',
    userId: 'asdf',
    status: OrderStatus.Created,
    ticket:{
      id:'askldfj',
      price:10
    }
  }

  //@ts-ignore
  const msg: Message={
    ack:jest.fn()
  };

  return {listener, data, msg};
  
};

it('replicates the order info', async () => {
  const { listener, msg, data } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
  const { listener, msg, data } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
