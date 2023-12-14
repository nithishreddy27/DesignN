import Payment from "../../../../models/Payment";
import User from "../../../../models/User";
import UserDetails from "../../../../models/User";
import connectDB from "../../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await addStudentCount(req,res);
      break;
    case "GET":
      await getStudentCount(req, res);
      break;
  }
}


const addStudentCount = async (req, res) => {
  try {
    await connectDB();

    const user = req.body.id;  
    const numberOfStudents = req.body.numberOfStudents;

    
    const data = await User.findOneAndUpdate({_id:user},{numberOfStudents:numberOfStudents},{ new: true })
      if (data) {
        return res.status(200).json({ message: "Status Updated"});
      } else {
        return res.status(200).json({ message: "No Colleges available" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
        // return res.status(200).json({ message: "Status Updated"});

};



const getStudentCount = async (req, res) => {
    try {
      await connectDB();
  
      const user = req.query.user;  
    //   const numberOfStudents = req.body.numberOfStudents;
  
      
      const data = await User.findOne({_id:user})
        if (data) {
          return res.status(200).json({ numberOfStudents: data.numberOfStudents});
        } else {
          return res.status(200).json({ message: "No Colleges available" });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
          // return res.status(200).json({ message: "Status Updated"});
  
  };



