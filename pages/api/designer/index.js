import User from "../../../models/User";
import connectDB from "../../../src/lib/connectDB";


export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
    //   await searchUserDetails(req, res);
      break;
    case "POST":
    //   await createUserDetails(req, res);
        try{
            await connectDB()

            const user = await User.findOne({ _id:req.body.userId})
            // console.log("user id ",req.body.userId)
            res.status(200).json({user:user})
        }
        catch(error){
            res.status(500).json({user:error})
        }
      break;
    case "PUT":
    //   await updateUserDetails(req, res);
      break;
  }
}

