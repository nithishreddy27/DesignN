import Orders from "../../../models/Orders"
import connectDB from "../../../src/lib/connectDB";


export default async function user(req, res) {
    
    await connectDB()

    switch (req.method) {
        case "POST":
            try{
                const newOrder = new Orders({
                    user: req.body.id,
                    customerName: req.body.name,
                    productName : req.body.productName,
                    service : req.body.services,
                    numberOfItems : req.body.number,
                    productImage: req.body.productImage,
                    phoneNumber : req.body.phoneNumber,
                    date : req.body.date,
                    email : req.body.email,
                    address:{
                        addressLineOne: req.body.addLineOne,
                        area : req.body.area,
                        city:req.body.city,
                        state:req.body.state
                    }
                })
                // console.log(newOrder)
                const response = await newOrder.save();
                // console.log("response in api ",response)
                res.status(200).json({done:true})
                // console.log(newO)
                // const response  = await Orders.insert(newOrder)
                // if(response){
                    //     res.status(200).json({done:true})
                    // }
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
