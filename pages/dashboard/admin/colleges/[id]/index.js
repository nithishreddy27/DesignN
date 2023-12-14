import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import crypto from "crypto";
import { useCollege } from "../../../../../src/hooks/useCollege";
import { toast } from "react-toastify";
import axios from "axios";
import { rename } from "../../../../../src/lib/helper";
import moment from "moment";
import { useResumeContext } from "../../../../../src/context/ResumeContext";

const Index = ({userDetails}) => {
  const user = JSON.parse(userDetails)
  console.log(user)
  

 
  return (
    // <div className="pt-[10vh]">
    //   {/* <div className="pt-[14vh]  sm:container mx-auto px-4 py-8">
    //     <h1 className="text-2xl font-bold mb-4">Payment History</h1>
    //     <table className="w-full border-collapse">
    //         <thead>
    //             <tr className="bg-orange-500  text-white text-base">
    //                 <th className="px-6 py-3 text-left font-medium  uppercase tracking-wider">Payment ID</th>
    //                 <th className="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Expiry Date</th>
    //                 <th className="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Days Left</th>
    //                 <th className="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Description</th>
    //                 <th className="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Amount</th>
    //                 <th className="px-6 py-3 text-left  font-medium  uppercase tracking-wider">Status</th>
    //             </tr>
    //         </thead>
    //         <tbody className="bg-white  divide-gray-300 ">
    //              {display?.length > 1 ? display.map((item)=>{
    //                 return(
    //                 <tr className='border-b border-gray-500'>
    //                     <td className="px-6 py-4 whitespace-nowrap font-mono text-red-400">{item.paymentId}</td>
    //                     <td className="px-6 py-4 whitespace-nowrap  text-gray-800">{item.expiryDate?.slice(0,10)}</td>
    //                     <td className="px-6 py-4 whitespace-nowrap  text-gray-800">{getNoofdays(item.expiryDate)} Days </td>
    //                     <td className="px-6 py-4 whitespace-nowrap  text-gray-800">{item.plan}</td>
    //                     <td className="px-6 py-4 whitespace-nowrap  text-gray-800">₹{item.amount}</td>
    //                     {getNoofdays(item.expiryDate) > 0 ? <td className="px-6 py-4 whitespace-nowrap text-green-500">Active</td> : <td className="px-6 py-4 whitespace-nowrap text-red-500">Expired</td>} 
    //                 </tr>
    //                 )
    //              }) : <tr>
    //                     <td></td><td></td><td>No Payment History Found</td>
    //               </tr>}
    //         </tbody>
    //     </table>
    // </div> */}

    // <div>
    //   <h1 className="text-2xl font-semibold text-center my-5">All Modules</h1>
    //   {modules && (
    //     <div className="grid sm:grid-cols-2 grid-cols-1 mx-auto sm:container gap-[1px] ">
    //       {
    //     modules.map((item)=>(
    //       <div>
    //           <div className="flex justify-center border shadow-lg py-3 px-6"> 
    //             <span className="mx-4 grow" >{item}</span>
    //             <button onClick={()=>{removeModule(item)}} className="bg-transparent hover:bg-red-500 text-red-700 font-medium hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded text-xs">Delete</button>
    //           </div>
    //       </div>
    //     ))
    //   }
    //     </div>
    //   )}
    // </div>

    //   <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:container mx-auto my-5">
    // <div className="my-2 ">
    //   <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Add Module</div>
    //     <div className="flex gap-2">
    //     <input type="text" className="focus:ring-0 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" name="module" id="module"  value={module}  onChange={(e)=>{setmodule(e.currentTarget.value)}}/>
    //     <button onClick={addModule} className="bg-orange-500 hover:bg-orange-700 text-white font-medium m-1 px-3 rounded">Submit</button>
    //     </div>
    // </div>


    // <div className="my-2">
    //    <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Number Of Students :  </p>
    //    <div className="flex gap-2">
    //     <input type="text" className="focus:ring-0 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" name="numberOfStudents" id="numberOfStudents"  value={numberOfStudents}  onChange={(e)=>{setnumberOfStudents(e.currentTarget.value)}}/>
    //     <button onClick={changeNumberOfStudents} className="bg-orange-500 hover:bg-orange-700 text-white font-medium m-1 px-3 rounded">Submit</button>
    //     </div>
    // </div>



    // <div className="my-2">
    //   <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">order Id </p>
    //   <div className="flex gap-2">
    //   <p>{payment.history.orderId}</p>
    //   {/* <form action="/api/college/details/orderId" method="POST"> */}
    //     <input type="text" className="focus:ring-0 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" name="user" id="user" value={id}  onChange={()=>{}}/>
    //     <input type="text" className="focus:ring-0 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" name="orderId" id="orderId"  value={orderId}  onChange={(e)=>{setorderId(e.currentTarget.value)}}/>
    //     <button onClick={changeOrderId} className="bg-orange-500 hover:bg-orange-700 text-white font-medium m-1 px-3 rounded">Submit</button>
    //     </div>
    //   {/* </form> */}
    // </div>
    // </div>
    // <div className="my-2 w-[50%] mx-24">
    //   <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Add Template Name</div>
    //     <div className="flex gap-2">
    //     <input type="text" className="focus:ring-0 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500" name="module" id="module"  value={template}  onChange={(e)=>{setTemplate(e.currentTarget.value)}}/>
    //     <button onClick={addTempalte} className="bg-orange-500 hover:bg-orange-700 text-white font-medium m-1 px-3 rounded">Submit</button>
    //     </div>
    // </div>

    //   <div className="sm:container mx-auto grid sm:grid-cols-2 mb-8 gap-2">
        
    //   <div className="my-2">
        
    //       <label
    //         htmlFor="photo"
    //         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //       >
    //         Upload Spreadsheet
    //       </label>
    //       <div className="flex gap-2">
    //       <input
    //         className=" appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
    //         label="Choose File"
    //         type="file"
    //         name="image"
    //         id="profileImg"
    //         onChange={handleFile}
    //       />
    //       {excelFileError &&
    //         toast.error(excelFileError, {
    //           toastId: excelFileError,
    //         })}
        
    //     <button onClick={handleCreate} className="bg-transparent hover:bg-orange-500 text-orange-700 font-medium hover:text-white border border-orange-500 hover:border-transparent rounded m-1 px-3 text-sm">Create</button>
    //     </div>
    //   </div>

    //   <div className="my-2">
      
    //       <label
    //         htmlFor="photo"
    //         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //       >
    //         Upload Spreadsheet
    //       </label>
    //         <div className="flex">
    //       <input
    //         label="Choose File"
    //         className=" appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
    //         type="file"
    //         name="image"
    //         id="profileImg"
    //         onChange={handleEducation}
    //       />
    //       {excelFileError &&
    //         toast.error(excelFileError, {
    //           toastId: excelFileError,
    //         })}
        
    //     <button onClick={handleEducationCreate} className="w-[30%] bg-transparent hover:bg-orange-500 text-orange-700 font-medium hover:text-white border border-orange-500 hover:border-transparent rounded m-1 px-3 text-sm">Create Education</button>
    //     </div>
    //   </div>

    //   <div className="my-2">
    //     <div className="">
    //       <label
    //         htmlFor="photo"
    //         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //       >
    //         Upload Spreadsheet
    //       </label>
    //         <div className="flex gap-2">
    //       <input
    //         label="Choose File"
    //         className=" appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
    //         type="file"
    //         name="image"
    //         id="profileImg"
    //         onChange={handlePayment}
    //       />
    //       {excelFileError &&
    //         toast.error(excelFileError, {
    //           toastId: excelFileError,
    //         })}
        
    //       <button onClick={handlePaymentCreate} className="w-[30%] bg-transparent hover:bg-orange-500 text-orange-700 font-medium hover:text-white border border-orange-500 hover:border-transparent rounded m-1 px-3 text-sm">Create Payment</button>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="my-2">
        
    //       <label
    //         htmlFor="photo"
    //         className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    //       >
    //         Upload Spreadsheet
    //       </label>
    //       <div className="flex gap-2">
    //       <input
    //         label="Choose File"
    //         className=" appearance-none block w-full p-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
    //         type="file"
    //         name="image"
    //         id="profileImg"
    //         onChange={handlePlaced}
    //       />
    //       {excelFileError &&
    //         toast.error(excelFileError, {
    //           toastId: excelFileError,
    //         })}
        
    //     <button onClick={handlePlacedStudent} className="w-[40%] bg-transparent hover:bg-orange-500 text-orange-700 font-medium hover:text-white border border-orange-500 hover:border-transparent rounded m-1 px-3 text-sm">Update Placed Students</button>
    //     </div>
    //   </div>
    
    //   </div>

    // </div>
    <div className="mt-24">
      Name : {user.profile?.firstName}
      orders:
      
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  console.log(query.id)
  const userId = query.id
  const user = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/designer`,{userId})
  console.log(user.data)
  // const displayDetails = new Array();
  // await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/payment/${query._id}`).then((res) => res.json()).then((res)=>{displayDetails.push(res)})

  //  const {
  //   data: { payment },
  // } = await axios.get(`${process.env.HOST_URL}/api/payment/${query?._id}`);


  // const numberOfStudents =  await axios.get(`${process.env.HOST_URL}/api/college/students/studentCount?user=${query?._id}`)
  
  // if(payment){
  //   const orderId = payment.orderId
  //   var numberOfStudentsRegistered
  //   const data = await axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/college/details/orderId?orderId=${orderId}`)
  //   numberOfStudentsRegistered = data.data.students.length
  // }

  // return {
  //   props: {
  //     id: query._id,
  //     displayDetails:displayDetails,
  //     payment:payment,
  //     numberOfStudentsRegistered:numberOfStudentsRegistered
  //   },
  // };
  return {
    props:{
      userDetails: user.data ? JSON.stringify(user.data.user) : JSON.stringify({user:null})
    }
  }
};

export default Index;
