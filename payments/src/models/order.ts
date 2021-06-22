import mongoose from 'mongoose';
import {OrderStatus} from '@fadecoding/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


//An interface that describes the properties
// required to create a new Order
interface OrderAttrs {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

//An interface that describes the properties
// that a Order model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

//An interface that describes the properties
// that a Order document has
interface OrderDoc extends mongoose.Document {
  status: OrderStatus;
  price: number;
  userId: string;
  version: number;
}

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    }
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

OrderSchema.set('versionKey', 'version');

OrderSchema.plugin(updateIfCurrentPlugin);

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export { Order };
