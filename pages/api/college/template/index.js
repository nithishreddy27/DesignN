import Payment from "../../../../models/Payment";
import UserDetails from "../../../../models/User";
import connectDB from "../../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await addTempalte(req,res);
      break;
    case "GET":
      await getTemplate(req,res);
    case "DELETE":
      await deleteModule(req, res);
      break;
  }
}


const addTempalte = async (req, res) => {
  try {
    await connectDB();

    const name = req.query.name;  
    const orderId = req.query.orderId;

    const college = await Payment.updateMany(
      {orderId:orderId},
      {$set:{ "standardTemplate":name }}
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
const getTemplate = async (req, res) => {
  try {
    await connectDB();
    console.log("inside get temp api")
    const user = req.query.id
    // console.log("user",user)
    // const name = req.query.name;  
    // const orderId = req.query.orderId;
      const userPayment =  await Payment.findOne({user:user})
      
    // const college = await Payment.updateMany(
    //   {orderId:orderId},
    //   {$set:{ "standardTemplate":name }}
    //   )
     
    //   if (college) {
    //     return res.status(200).json({ message: "Status Updated"});
    //   } else {
    //     return res.status(200).json({ message: "No Colleges available" });
    //   }
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


