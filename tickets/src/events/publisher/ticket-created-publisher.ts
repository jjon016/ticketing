import { Publisher, Subjects, TicketCreatedEvent } from '@fadecoding/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
