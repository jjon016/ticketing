import { Publisher, TicketCreatedEvent, Subjects } from '@fadecoding/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
