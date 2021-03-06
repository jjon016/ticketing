import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { Listener, OrderCreatedEvent, Subjects } from '@fadecoding/common';
import { queueGroupName } from './queue-group-name';
import { TicketUpdatedPublisher } from '../publisher/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    //find ticket that matches ticket id in the order
    const ticket = await Ticket.findById(data.ticket.id);

    //if not found throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    //if found then mark order id on ticket
    ticket.set({ orderId: data.id });
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      version: ticket.version,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    //ack the message
    msg.ack();
  }
}
