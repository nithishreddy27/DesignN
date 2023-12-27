import mongoose from "mongoose";

const documentationSchema = new mongoose.Schema(
  {
    user: {type:String},
    paid: {type : Boolean},
    amount : {type:Number},
    filePath :[{ 

        userId:{type:String},
        name:{type:String},
        url:{type:String},
        type:{type:String},
        date:{type:String},
        status:{type:String},
        numberOfPages:{type:Number},
        numberOfCopies:{type:String}

    }],
    address:{
      college:{type:String},
      line: {type:String},
      area :{type:String},
      city:{type:String},
      state:{type:String},
      country:{type:String}
    },
    email:{type:String},
    phone:{type:Number},
    orderId:{type:String},
    date:{type:String},
    college:{type:String}
  },
  { timestamps: true }
);

export default mongoose.models.documentation || mongoose.model("documentation", documentationSchema);
