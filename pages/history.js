import React from 'react'
import { useState } from 'react'
export default function History() {
  const [dropdown,setdropdown]=useState(false)
  return (
    <div className=''>
       <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">Payment History</h1>
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-orange-500">
                    <th class="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Description</th>
                    <th class="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody class="bg-white  divide-gray-300">
                <tr onClick={()=>{setdropdown(!dropdown)}} className={`${dropdown ? "border-b-0":"border-b"}`}>
                    <td class="px-6 py-4 whitespace-nowrap">04/24/2023</td>
                    <td class="px-6 py-4 whitespace-nowrap">Payment for Product A</td>
                    <td class="px-6 py-4 whitespace-nowrap">$100.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-green-500">Paid</td>
                   
                </tr>
                {dropdown==true && (
                  <tr className='container border-b-3 border-gray-300 text-center'>
                    <td>category:"Resume"</td>
                  <td>expiry date:"1-3-2023</td>
                  <td>receipt Id:"23456789</td>
                  <td>modules:resumes</td>
                  </tr>
                )}
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">04/22/2023</td>
                    <td class="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
                    <td class="px-6 py-4 whitespace-nowrap">$50.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-green-500">Paid</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">04/20/2023</td>
                    <td class="px-6 py-4 whitespace-nowrap">Payment for Product C</td>
                    <td class="px-6 py-4 whitespace-nowrap">$75.00</td>
                    <td class="px-6 py-4 whitespace-nowrap text-red-500">Failed</td>
                </tr>
            </tbody>
        </table>
    </div>
     
    </div>
  )
}
