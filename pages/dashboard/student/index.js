import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";

import crypto from "crypto";


const StudentIndex = ({ userDetails }) => {
  return(
    <div>

    </div>
  )
};

export const getServerSideProps = async ({ req, res }) => {
  
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );


  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
 
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
 
  
  if(user){
    
    if (!user.detailsAvailable) {
      return {
        redirect: {
          destination: "/auth/user/details",
          permanent: false,
        },
      };
    }
  
    if (user.category !== "student") {
      return {
        redirect: {
          destination: `/dashboard/${user.category}`,
          permanent: false,
        },
      };
    }
  
    if (user.category === "student" && !user.academicsAvailable) {
      return {
        redirect: {
          destination: "/auth/user/academics",
          permanent: false,
        },
      };
    }
    const inputHash = crypto.pbkdf2Sync(defaultPassword, user.salt, 1000, 64, "sha512").toString("hex");
      const passwordsMatch = user.hash === inputHash; 
      if (passwordsMatch) {
        return {
          redirect: {
            destination: "/dashboard/student/profile/changePassword",
            permanent: false,
          },
        };
      }
  
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
      // college: user.college.name,
      // crtPayment: crt.message,
      // displayDetails: displayDetails,
    },
  };
};

export default StudentIndex;
