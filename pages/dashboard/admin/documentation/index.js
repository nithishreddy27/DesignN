import React from 'react'

import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import axios from 'axios';

export default function Index({userDetails}) {
  const user = JSON.parse(userDetails)
  // console.log(user)
  return (
    <div className='mt-24'>
        this is documentation page
    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  const documentation = await axios.get(`${process.env.HOST_URL}/api/documentation`)
  const documents = await documentation.json();
  console.log(documents);
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
  if (user && user.category !== "admin") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }
  return {
    props: {userDetails : JSON.stringify(user)},
  };
};