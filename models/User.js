import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      trim: true, 
      unique: true 
    },
    
    hash: { type: String },
    salt: { type: String },
   
    detailsAvailable: {
      type: Boolean,
    },
   
    profile: {
      firstName: {
        type: String,
        trim: true,
      },
      middleName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
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
    
    approved: {
      type: Boolean,
    },
    category: {
      type: String,
    },
    
    college: {
      name: {
        type: String,
      },
      code: {
        type: String,
      },
    },

  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
