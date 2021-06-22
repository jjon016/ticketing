import { Publisher, Subjects, PaymentCreatedEvent } from '@fadecoding/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
