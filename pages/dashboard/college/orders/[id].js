
import axios from 'axios';
import React from 'react'


export default function Order({ordersDetails}) {
    const order = JSON.parse(ordersDetails)
    console.log(order)
  return (
    <div className='mt-24'>
      
        <img src={order.productImage} alt="No image"  className='w-[250px] h-[250px]'/>
      
        <p>

        Name of the product : {order.productName}
        </p>
        <p>

        Ordered by : {order.customerName}
        </p>
        User Id : {order.user}
        <p>

        Email : {order.email}
        </p>
        Phone Number : {order.phoneNumber}
        <p>

        Service : {order.service}
        </p>

        <p>

            Product Image url : {order.productImage}

        </p>

        <p>

            Ordered Date : {order.createdAt}

        </p>
        <p>Delivery date : {order.date}</p>
        
        {/* <p>Order Id : {order._id}</p> */}
        <p>Number of items : {order.numberOfItems}</p>


        <p>
            Address 
               <div className='mx-10'>
               <p>
                    address Line one : {order.address.addressLineOne}
                </p>
                <p>
                    Area : {order.address.area}
                </p>
                <p>
                    City : {order.address.city}
                </p>
                <p>
                    State : {order.address.state}
                </p>
               </div>
        </p>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {
    
    const orderID = params.id

    const ordersDetails  = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/orders/individual`,{orderId : orderID})
    const order = ordersDetails?.data?.order
    console.log(order);
    // console.log("req query")
    // const session = await getLoginSession(req);
    // const user = (session?._doc && (await findUser(session._doc))) ?? null;
    // const ord = await axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/api/orders`)
   
    // const { query } = req; // Access the query object from req
    // const { slug } = query;
    // console.log(slug)

    // if (user && !user.detailsAvailable) {
    //   return {
    //     redirect: {
    //       destination: "/auth/user/details",
    //       permanent: false,
    //     },
    //   };
    // }
    // if (user && user.category !== "college") {
    //   return {
    //     redirect: {
    //       destination: "/dashbaord/" + user.category,
    //       permanent: false,
    //     },
    //   };
    // }
    // if (!user.approved) {
    //   return {
    //     redirect: {
    //       destination: "/approvalpending",
    //       permanent: false,
    //     },
    //   };
    // }
    return {
      props: {
        ordersDetails : JSON.stringify(order)
        // userDetails: JSON.stringify(user),
        // ordersDetails : JSON.stringify(orders)
      
      },
    };
  };

