import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@fadecoding/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
