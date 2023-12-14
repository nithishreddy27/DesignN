import Payment from "../../../../models/Payment";
import UserDetails from "../../../../models/User";
import connectDB from "../../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await addModule(req,res);
      break;
    case "DELETE":
      await deleteModule(req, res);
      break;
  }
}


const addModule = async (req, res) => {
  try {
    await connectDB();

    const module = req.query.module;  
    const orderId = req.query.orderId;

    const college = await Payment.updateMany(
      {orderId:orderId},
      {$push:{ 'history.$[].modules': module }}
      )
     
      if (college) {
        return res.status(200).json({ message: "Status Updated"});
      } else {
        return res.status(200).json({ message: "No Colleges available" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
        // return res.status(200).json({ message: "Status Updated"});

};


const deleteModule = async (req, res) => {

  try {
    await connectDB();

    const module = req.query.module;  
    const orderId = req.query.orderId;
    const college = await Payment.updateMany(
      {orderId:orderId},
      {$pull:{ 'history.$[].modules': module }}
      )
    
      if (college) {
        return res.status(200).json({ message: "Status Updated", college });
      } else {
        return res.status(200).json({ message: "No Colleges available", colleges: [] });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
        // return res.status(200).json({ message: "Status Updated"});

};


