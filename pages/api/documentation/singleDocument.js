import Documentation from "../../../models/Documentation";

import connectDB from "../../../src/lib/connectDB";


export default async function handler(req, res) {
    const id  = req.body.id
    console.log("inside api ",id)
  switch (req.method) {
    case "GET":
    //   await searchUserDetails(req, res);
    //   console.log("inside documentation get")
    //   const documents = await Documentation.find()  
    //   res.status(200).json({done:documents})
      break;
    case "POST":
        
        try{
            await connectDB()

            const document  = await Documentation.findById(id)
            console.log("document ",document )
            res.status(200).json({document:document})
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

