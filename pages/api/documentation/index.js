import Documentation from "../../../models/Documentation";
import User from "../../../models/User";
import connectDB from "../../../src/lib/connectDB";


export default async function handler(req, res) {
    console.log("inside api ",req.body)
  switch (req.method) {
    case "GET":
    //   await searchUserDetails(req, res);
      console.log("inside documentation get")
      const documents = await Documentation.find()  
      res.status(200).json({done:documents})
      break;
    case "POST":
        
        try{
            await connectDB()

            const document = Documentation.create(req.body)
            res.status(200).json({user:document})
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

