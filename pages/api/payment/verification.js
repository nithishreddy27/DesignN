import crypto from "crypto";
import Payment from "../../../models/Payment";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      await verifyAndUpdateOrder(req, res);
      break;
  }
}

const verifyAndUpdateOrder = async (req, res) => {
  try {
    await connectDB();

    const { razorpay_order_id, razorpay_signature, razorpay_payment_id } = req.body.response;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    const hash = crypto.createHmac("sha256", key_secret);
    hash.update(razorpay_order_id + "|" + razorpay_payment_id);
    const digest = hash.digest("hex");

    var now = new Date();
   



    if (digest === razorpay_signature) {
      
    
      console.log("body inside api ",req.body)
      const paymentDetails = await Payment.findOne({user:req.body.userId})
      const existPayment = {
        date : now,
        paymentId : req.body.response.razorpay_payment_id,
        amount : req.body.amount,
        orderId : req.body.razorpay_order_id,
        email : req.body.email,
        phone : req.body.phone,
        address:{
          line:req.body.address.line,
          area:req.body.address.area,
          city:req.body.address.city,
          state: req.body.address.state,
          country:req.body.address.country
        }
      }
      const newPayment = new Payment(

      {
        user:req.body.userId,
        history:[
{

        date : now,
        paymentId : req.body.response.razorpay_payment_id,
        amount : req.body.amount,
        orderId : req.body.razorpay_order_id,
        email : req.body.email,
        phone : req.body.phone,
        address:{
          line:req.body.address.line,
          area:req.body.address.area,
          city:req.body.address.city,
          state: req.body.address.state,
          country:req.body.address.country
        }
      }

      ]
      
    }
    ) 
      try{

        if (paymentDetails) {
          console.log("body inside payment details ",existPayment)  
          const arr = []
          
          paymentDetails.history.map((item)=>{
            arr.push(item)
          })
          arr.push(existPayment);
          await Payment.findOneAndUpdate({user:req.body.userId},{$set:{history:arr}});
          console.log("created ")     
      } else {
        console.log("body inside new details ",newPayment)  

        await newPayment.save()

        console.log("created ")     

      }


      if(req.body.fileName){
        console.log("inside documentation ",req.body.fileName )
        const document = new Documentation({ 
          user: req.body.userId,
          paid: true,
          filePath : "https://www.dropbox.com/preview/Apps/designnation"+req.body.fileName
        })
        await document.save()
      }
      
      
      return res.status(200).json({ message: "Payment Successfull" });
    } 
    catch(error){
      console.log("created ",error)     

      return res.status(200).json({ message: "Please Try Again!" });
    }
    } else return res.status(200).json({ message: "Payment Unsuccessfull" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
