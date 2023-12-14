import Payment from "../../../../models/Payment";
import UserDetails from "../../../../models/User";
import connectDB from "../../../../src/lib/connectDB";

export default async function handler(req, res) {


  switch (req.method) {
    case "POST":
      await putOrderId(req, res);
      break;

    case "GET":
      await getStudents(req,res)
      break;

  }
}

const putOrderId = async (req, res) => {

    try {
      await connectDB();
      
      const id  = req.body.id;
    
    const college = await Payment.findOneAndUpdate({user: id}, req.body, {
      new: true,
    });
    if (college) {
      return res.status(200).json({ message: "College Deleted" });
    } else {
      return res.status(200).json({ message: "No Colleges available" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const getStudents = async (req, res) => {
  try {
    await connectDB();

    const id  = req.query.orderId;
    const students = await Payment.find({orderId: id});
    console.log("students",students.length)
      
      if (students) {
        return res.status(200).send({ students : students });
      } else {
        return res.status(200).json({ message: "No Students" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};
