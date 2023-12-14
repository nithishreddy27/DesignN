import College from "../../../models/College";
import Resume from "../../../models/Resume";
import User from "../../../models/User";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
    // console.log("inside")
  switch (req.method) {
    case "POST":
      await addCollege(req, res);
      break;
    case "PUT":
      // await updateName(req, res);
      await removeIndividual(req,res);
      break;
  }
}

const addCollege = async (req, res) => {
  try {
    
    await connectDB();
    // await User.deleteMany({
    //     category:"student"
    //     })
    // console.log("in api",deleteQuery)
    res.status(200).json("done")
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updateName = async (req, res) => {
  try {
    await connectDB();
    console.log("done")
    // await User.updateMany(({"profile.middleName":"NA"}, { $set: { "profile.middleName": "" } }))
    // await User.updateMany(({"profile.lastName":"NA"}, { $set: { "profile.lastName": "" } }))
    // await Resume.updateMany({"personal.lastName":"NA"}, { $set: { "personal.lastName": "" } })
    res.status(200).json("done")
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeIndividual = async (req, res) => {
  try {
    await connectDB();
    console.log("done")
    // /20B81A.*@cvr\.ac\.in/
    // const users = await User.find({$and:[{"email":{$regex: /^(?![a-zA-Z])20B81A.*@cvr\.ac\.in/ }},{"detailsAvailable":false}]})
    const users = await User.find({$and:[{"email":{$regex: /^(?![a-zA-Z])20B81A.*@cvr\.ac\.in/ }},{"category":"individual"}]})

    console.log("user s",users.length);
    users.forEach(async (user)=>{
      // await User.findOneAndUpdate({"email":user.email},{$set:{"category":"student",college:{name:"CVR COLLEGE OF ENGINEERING",code:"cvrcoe",passphrase:"cvr",website:"cvr.in"}}})
      console.log(user.email);
    })
    res.status(200).json("done")
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


