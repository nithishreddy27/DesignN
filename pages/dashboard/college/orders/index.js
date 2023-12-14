import React, { useEffect, useState, Fragment } from "react";
import axios, { Axios } from "axios";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import Link from "next/link";

export default function Index({userDetails , ordersDetails}) {
  const user = JSON.parse(userDetails);
  const orders = JSON.parse(ordersDetails);
  console.log("orders ",orders)
  return (
    <div className="mt-24">
        All orders 

        {orders?.map((order)=>(
          <div className="mx-10 my-10"> 
            <Link href={`http://localhost:3000/dashboard/college/orders/${order._id}`}>{order._id}</Link>
            <p>

             Order Name : {order?.productName} {console.log(order)}
            </p>
            <p>

             Service : {order?.service}
            </p>

            <p>
              Delivery Date : {order?.date}
            </p>
          </div>
        ))}




    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
    const session = await getLoginSession(req);
    const user = (session?._doc && (await findUser(session._doc))) ?? null;
    const ord = await axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/orders`)
    const orders = ord.data.orders
    console.log("orders :",orders) 
    if (user && !user.detailsAvailable) {
      return {
        redirect: {
          destination: "/auth/user/details",
          permanent: false,
        },
      };
    }
    if (user && user.category !== "college") {
      return {
        redirect: {
          destination: "/dashbaord/" + user.category,
          permanent: false,
        },
      };
    }
    if (!user.approved) {
      return {
        redirect: {
          destination: "/approvalpending",
          permanent: false,
        },
      };
    }
    return {
      props: {
        
        userDetails: JSON.stringify(user),
        ordersDetails : JSON.stringify(orders)
      
      },
    };
  };
