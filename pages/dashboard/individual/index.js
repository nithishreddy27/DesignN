import React, { useContext, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";




const StudentIndex = ({ userDetails }) => {


  const user = JSON.parse(userDetails);
  


  return (
    <div className="mt-24">
      This is individual
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );


  const session = await getLoginSession(req);
  // console.log("session",session)
  const user = (session?._doc && (await findUser(session._doc))) ?? null;

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (user.detailsAvailable == false) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  if (user.category !== "individual") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }


 
  // const displayDetails = new Array();
  // await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/payment/${user._id}`)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     displayDetails.push(res);
  //   });

  // const {
  //   data: { payment },
  // } = await axios.get(`${process.env.HOST_URL}/api/payment/${user?._id}`);

  // //whyy
  // const { data: crt } = await axios.get(
  //   `${process.env.HOST_URL}/api/payment/crt?id=${user?.email}`
  // );

  return {
    props: {
      userDetails: JSON.stringify(user),
      
    },
  };
};

export default StudentIndex;
