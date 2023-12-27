import axios from 'axios';
import React from 'react'
import { getLoginSession } from '../../../../src/lib/auth';
import { findUser } from '../../../../src/lib/user';

export default function Index({orderDetails}) {
  const orders = JSON.parse(orderDetails)
  console.log(orders);
  return (
    <div className='mt-24'>This is orders page

      <div>

          {orders.map((order)=>(
            <div className='my-5'>
             <p> Service type :  {order.service}</p>
              <p>Ordered By :  {order.user}</p>
              <p>Product Name : {order.productName}</p>
              <p>Number of products : {  order.numberOfItems}</p>
            </div>
          ))}
      </div>
    
    </div>
  )
}



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
  if (user && user.category !== "admin") {
    return {
      redirect: {
        destination: `/dashboard/${user.category}`,
        permanent: false,
      },
    };
  }

  const orderDetails = await axios.get(`${process.env.HOST_URL}/api/orders`)
  const orders = orderDetails.data.orders
  console.log(orderDetails.data)
  return {
    props: {
      orderDetails : JSON.stringify(orders)
    },
  };
};