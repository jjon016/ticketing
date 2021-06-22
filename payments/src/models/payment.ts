import mongoose from 'mongoose';

//An interface that describes the properties
// required to create a new Payment
interface PaymentAttrs {
  orderId: string;
  stripeId: string;  
}

//An interface that describes the properties
// that a Payment model has
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

//An interface that describes the properties
// that a Payment document has
interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;  
}

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', PaymentSchema);

export { Payment };
