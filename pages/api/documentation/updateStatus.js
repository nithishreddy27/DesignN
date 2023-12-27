import Documentation from "../../../models/Documentation";

import connectDB from "../../../src/lib/connectDB";


export default async function handler(req, res) {
    // const id  = req.body.id
    console.log("inside api ",req.body)
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
            let updateQuery = {};
            updateQuery['filePath.' + req.body.ind + '.status'] = "complete";
            console.log("query ",updateQuery)
            const updatedDoc = await Documentation.findByIdAndUpdate(
                req.body.id ,
                { $set: updateQuery },
                { new: true }
            );
            console.log('Updated document:', updatedDoc);

            // const updatedDoc = await Documentation.findOneAndUpdate(
            //     { _id: ObjectId(req.body.id), 'filePath._id': { $exists: true } }, // Find the document by ID and ensure filePath exists
            //     { $set: { 'filePath.$.status': newStatus } }, // Use $ to update the specific element in the filePath array
            //     { new: true } // To return the updated document after the update
            //   );

            // const document  = await Documentation.findById(req.body.id)
            // const arr =[] 
            // const files = document.filePath?.map((file,index)=>{
            //     if(index == req.body.ind){
            //         const tempFile = {...file , status :"Completed"}
            //         arr.push(tempFile)
            //     }
            //     else{
            //         arr.push(file)
            //     }
            // })
            // const doc = await Documentation.findByIdAndUpdate(req.body.id ,
            //     { $set: { filePath: arr } }, 
            //     { new: true })

            // console.log("document ",doc )
            res.status(200).json({document:true})
        }
        catch(error){
            console.log("error ",error)
            res.status(500).json({user:error})
        }
        // res.status(500).json({user:true})
      break;
    case "PUT":
    //   await updateUserDetails(req, res);
      break;
  }
}

