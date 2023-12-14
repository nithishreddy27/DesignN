import React, { useEffect, useState, Fragment } from "react";
import Image from "next/image";

import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";

import axios, { Axios } from "axios";
import Link from "next/link";

const Index = ({ userDetails }) => {
  const user = JSON.parse(userDetails);
  
  return (
    <div className="mt-24">
      this is Designer Dashboard
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
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
    props: { userDetails: JSON.stringify(user)},
  };
};
export default Index;
