import { Publisher, OrderCreatedEvent, Subjects } from '@fadecoding/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
