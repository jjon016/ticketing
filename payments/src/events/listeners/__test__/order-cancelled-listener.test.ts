import { OrderCancelledEvent,OrderCreatedEvent,OrderStatus } from '@fadecoding/common';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Order } from '../../../models/order';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const order = Order.build({
    id:mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: 'asldkf',
    version:0
  });
  await order.save();

  const data: OrderCancelledEvent['data']={
    id: order.id,
    version: 1,
    ticket: {
      id: 'asdfasdf'
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, order, data, msg };
};

it('updates the status of the order', async () => {
  const { listener, order, msg, data } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);    
});

it('acks the message', async () => {
  const { listener, order, msg, data } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

