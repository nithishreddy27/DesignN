import mongoose from "mongoose";
 
const paymentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    history:[{
      paymentId: {
        type: String,
      },
      amount: {
        type: Number,
      },
      orderId: {
        type: String,
      }, 
      coupon: {
        data: [
          {
            type: String,
          },
        ],
        discount: {
          type: Number,
        },
      },
      email: String,
      phone: String,
      address: {
        line: String,
        area:String,
        city:String,
        state:String,
        country: String,
        postal: String,
      },
      date : Date
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.payments || mongoose.model("payments", paymentSchema);
