import connectDB from "../../../../src/lib/connectDB"
import Payment from "../../../../models/Payment"

export default async function handler(req,res){
    connectDB();
    const method = req.method;
    const {company} = req.query;
    switch(method)
    {
        case "GET":
            const data = await Payment.find({})
            if(data)
            {
                return res.json(data);
            }
            else
            {
                return res.status(500).json({"Error":"500 Internal Server Error"})
            }
            break;
        default:
            res.send("Default");
            break;
    }





}