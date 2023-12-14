import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    user: {type:String},
    paid: {type : Boolean},
    customerName:{type:String},
    
    productName:{type:String},
    
    service:{type:String},
    
    numberOfItems:{type:String},
    
    productImage:{type:String},
    
    phoneNumber:{type:String},
    date:{type:Date},
    email:{type:String},
    
    address:{
        addressLineOne:{type:String},
        area:{type:String},
        city:{type:String},
        state:{type:String},
    }
    

  },
  { timestamps: true }
);

export default mongoose.models.orders || mongoose.model("orders", ordersSchema);
