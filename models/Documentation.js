import mongoose from "mongoose";

const documentationSchema = new mongoose.Schema(
  {
    user: {type:String},
    paid: {type : Boolean},
    filePath :{ type :String}

  },
  { timestamps: true }
);

export default mongoose.models.documentation || mongoose.model("documentation", documentationSchema);
