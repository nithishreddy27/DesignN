import connectDB from "../../../../src/lib/connectDB"
import User from "../../../../models/User"

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":          
        const status = await User.findOne({email:req.body.email});
        if(status)
        {
          return res.json({status:"Ok"});
        }
        return res.json({status:"Fail"})
  }
}
