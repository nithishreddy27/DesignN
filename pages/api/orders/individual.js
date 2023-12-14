import Orders from "../../../models/Orders"
import connectDB from "../../../src/lib/connectDB";


export default async function user(req, res) {
    
    await connectDB()

    switch (req.method) {
        case "POST":
            try{
                const order = await Orders.findById(req.body.orderId)
                // console.log('inside post api orders individual ',order)
                res.status(200).json({order:order})
          
                }   
                catch(e){
                console.log("res", e);
                res.status(500).json({done:false})
        
            }
            break;
        case "GET":

            const ord = await Orders.find()
            console.log("inside get orders");
            res.status(200).json({orders:ord})
            break;
        default:
            break;
    }
    
}
