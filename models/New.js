import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
   
    phone: {
      value: {
        type: Number,
      },
      verified: {
        type: Boolean,
        default: false,
      },
      frozen: {
        type: Boolean,
        default: false,
        
      },
    },


  },
  { timestamps: true }
);

export default mongoose.models.numbers || mongoose.model("numbers", userSchema);
