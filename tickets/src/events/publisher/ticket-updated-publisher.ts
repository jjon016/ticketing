import { Publisher, Subjects, TicketUpdatedEvent } from '@fadecoding/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
