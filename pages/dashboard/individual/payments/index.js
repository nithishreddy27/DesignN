import React,{useState,useEffect} from 'react'
import { getLoginSession } from '../../../../src/lib/auth';
import { findUser } from '../../../../src/lib/user';
import moment from "moment";
const viewPayments = ({displayDetails}) => {
   const getNoofdays = (old_date) => {
        const year = old_date?.slice(0,4);
        const month = old_date?.slice(5,7);
        const day = old_date?.slice(8,10);
        var dateObj = new Date();
        var mnow = dateObj.getUTCMonth() + 1;
        var dnow = dateObj.getUTCDate();
        var ynow = dateObj.getUTCFullYear()
        var olddate = year + "-"+month+"-"+day;
        var newdate = ynow + "-"+mnow + "-"+dnow;
        var d1 = moment(olddate);
        var d2 = moment(newdate);
        var days = d1.diff(d2, 'days') 
        console.log("days ",days);
        if(days>0)
        {
          return days
        }
        return "0"
   }

  return (
    <div className='min-h-screen'>
       <div class="pt-[14vh]  container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">Payment History</h1>
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-orange-500  text-white text-base">
                    <th class="px-6 py-3 text-left font-medium  uppercase tracking-wider">Payment ID</th>
                    <th class="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Expiry Date</th>
                    <th class="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Days Left</th>
                    <th class="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Description</th>
                    <th class="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody class="bg-white  divide-gray-300">
                 {displayDetails.payment.history.length > 0 ? displayDetails.payment.history.map((item)=>{
                    return(
                    <tr className='border-b border-gray-500'>
                        {item.amount > 0 ? <td class="px-6 py-4 whitespace-nowrap font-mono text-red-400">{item.paymentId}</td> : <td class="px-6 py-4 whitespace-nowrap font-mono text-red-400">Free Subscription</td>}
                        {item.amount > 0 ? <td class="px-6 py-4 whitespace-nowrap  text-gray-800">{item.expiryDate?.slice(0,10)}</td> : <td class="px-6 py-4 whitespace-nowrap  text-gray-800">No Expiry Date</td>}
                        <td class="px-6 py-4 whitespace-nowrap  text-gray-800">{getNoofdays(item.expiryDate)} Days </td>
                        <td class="px-6 py-4 whitespace-nowrap  text-gray-800">{item.plan.charAt(0).toUpperCase() + item.plan.slice(1)}</td>
                        <td class="px-6 py-4 whitespace-nowrap  text-gray-800">₹{item.amount}</td>
                        {item.amount > 0 ?  getNoofdays(item.expiryDate) > 0 ? <td class="px-6 py-4 whitespace-nowrap text-green-500">Active</td> : <td class="px-6 py-4 whitespace-nowrap text-red-500">Expired</td> : <td class="px-6 py-4 whitespace-nowrap text-green-500">Active</td> } 
                    </tr>
                    )
                 }) : <tr>NO payment History Found</tr>}
            </tbody>
        </table>
    </div>

    </div>
  )
}



export const getServerSideProps = async ({ req, res }) => {
    const session = await getLoginSession(req);
    const user = (session?._doc && (await findUser(session._doc))) ?? null;
    const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/payment/${user._id}`);
    const displayDetails = await data.json();
    return {
      props : {
        displayDetails : displayDetails
      }
    }
  };


export default viewPayments
