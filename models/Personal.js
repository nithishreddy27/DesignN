import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
  user: String,
  rollNumber: { type: String },
  contact: {
    parents: {
      father: {
        name: String,
        email: String,
        phone: String,
        occupation: String,
      },
      mother: {
        name: String,
        email: String,
        phone: String,
        occupation: String,
      },
    },
    address: {
     type:String
    },
    linkedin: {
      type: String,
    },
    website: {
      type: String,
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
  details:{
    image: {
      type: String,
      default:
        "http://res.cloudinary.com/dj7nomqfd/image/upload/v1647117869/uploads/bphhxvmlcyyu2pntbikm.png",
    },
    aadhar:{
      type:String,
    },
    pan:{
      type:String,
    },
    alternativeNumber:{
      type:Number
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
  }
});

export default mongoose.models.personals || mongoose.model("personals", personalSchema);
