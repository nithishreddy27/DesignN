import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { MdDoubleArrow } from "react-icons/md";
import { countries, getEighteenPercent } from "../../../src/lib/helper";
import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";
import { toast } from "react-toastify";
import { useResumeContext } from "../../../src/context/ResumeContext";
  

const CheckoutSlug = ({ userDetails, id }) => {
  const session = JSON.parse(userDetails);
  // var { payment, isError, isLoading } = usePlan(session._id);
  const date = new Date()
  const {pages , setpages , fileName , numberOfColor , numberOfBW}  = useResumeContext();
  
  const [amount, setAmount] = useState()
  const router = useRouter();
  const [plan, setPlan] = useState(null);
  const [step, setStep] = useState("personal");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState({
    line: "",
    area:"",
    city:"",
    state:"",
    country: "",
  });


  useEffect(()=>{
  console.log("file name :" ,fileName)
  },[fileName])
  useEffect(()=>{
    console.log("insdie  if",numberOfBW , numberOfColor)
    if(numberOfBW && numberOfColor){
      setAmount(numberOfBW*3 + numberOfColor*5)
    }
    else if(numberOfBW == 0){
      setAmount( numberOfColor*5)
    }
    else if(numberOfColor == 0){
      setAmount(numberOfBW*3 )
    }
    else{
      console.log("insied else")
    }
  },[numberOfColor , numberOfBW])

  const createOrder = async (a) => {
    const finalAmount = amount
    const {
      data: { order },
    } = await axios.get(`/api/payment/?amount=${finalAmount}`);
    console.log(order)
    return { amount: order.amount, orderId: order.id };
  };

  const createTransferOrder = async (a) => {
    const finalAmount = amount
    const {
      data: { order },
    } = await axios.get(`/api/payment/transfers?amount=${finalAmount}`);

    return { amount: order.amount, orderId: order.id };
  };

  const initializeRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };




  const handlePay = async () => {
    const res = await initializeRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // if (id == 3) {
    //   var { amount, orderId } = await createTransferOrder(
    //     amount
    //   );
    // } else {
    //   var { amount, orderId } = await createOrder(
    //     amount
    //   );
    // }
    var { amount, orderId } = await createOrder(amount);
    var options = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      name: "Design Nation",
      currency: "INR",
      amount: amount,
      order_id: orderId,
      description: "Thankyou for your test donation",
      image: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png",
      handler: async function (response) {
        if (response) {
            console.log("inside response")
            const {
              data: { message },
            } = await axios.put("/api/payment/verification", {
              response,
              plan: plan?.name,
              userId: session?._id,
              amount: amount / 100,
              email,
              address,
              phone,
              fileName
            });
            if (message == "Payment Successfull") {
              toast.success(message, { toastId: message });
              router.push(`/db`);
            } else toast.error(message, { toastId: message });
          
        }
      },
      prefill: {
        email: email && email,
        contact: phone && phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const pageRoutes = [
    { name: "Personal", current: step === "personal" },
    { name: "Address", current: step === "address" },
    { name: "Payment", current: step === "payment" },
  ];


  return (
    <div className='flex'>
      <div className='flex items-center justify-center w-[50%] h-screen'>
        <div className='w-[60%] mx-auto'>
          <div className='relative w-40 h-16 my-2'>
            <Image
              placeholder='blur'
              blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
              layout='fill'
              objectFit='contain'
              className=''
              src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
              alt=''
            />
          </div>
          <nav className='flex' aria-label='Breadcrumb'>
            <ol role='list' className='flex items-center space-x-1'>
              <li>
                <div>
                  <Link href={"/packages"}>
                    <a className='text-gray-400 hover:text-gray-700'>Packages</a>
                  </Link>
                </div>
              </li>
              {pageRoutes.map((page) => (
                <li key={page.name} className='mt-[1.5px]'>
                  <div className='flex items-center'>
                    <ChevronRightIcon
                      className='flex-shrink-0 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <a
                      href={page.href}
                      className={`${
                        page.current ? "font-semibold text-gray-700" : "text-gray-400"
                      } ml-2`}
                    >
                      {page.name}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
          <div className='my-5'>
            <h1 className='block text-lg font-medium text-gray-800'>Payment Details</h1>
            <p className='text-sm font-semibold text-gray-500 mb-3'>
              Complete your purchase by providing your payment information.
            </p>
            {step === "personal" && (
              <div data-aos='fade-left' className='sm:col-span-4 my-4'>
                <div>
                  <label htmlFor='email' className='block text-lg font-medium text-gray-500'>
                    Email address
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='phone' className='block text-lg font-medium text-gray-500 mt-3'>
                    Phone
                  </label>
                  <div className='mt-1'>
                    <input
                      id='phone'
                      name='phone'
                      type='text'
                      autoComplete='tel'
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
                <button
                  onClick={() =>
                    email.length > 4 && phone
                      ? setStep("address")
                      : toast.error("Please check your details")
                  }
                  type='button'
                  className='my-4 w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800'
                >
                  Continue
                  <MdDoubleArrow className='ml-1 -mr-1 mt-1 h-4 w-4' aria-hidden='true' />
                </button>
              </div>
            )}
            {step === "address" && (
              <div data-aos='fade-left' className=''>
                <h1 className='mt-4 block text-md font-medium text-gray-800'>
                  Where are you located?
                </h1>
                {/* <p className='text-sm font-semibold text-gray-500 mb-3'>
                  Please enter your Country and Post/ ZIP Code below. We collect this information to
                  help combat fraud, and to keep your payment secure.
                </p> */}
                <div className='sm:col-span-3 mt-4'>
                  <label htmlFor='line' className='block text-lg font-medium text-gray-500'>
                    Address Line One
                  </label>
                  <div className='mt-1'>
                    <input type="text" value={address.line} onChange={(e) => setAddress({ ...address, line: e.target.value })} />
                  </div>
                </div>
                <div className='sm:col-span-3 mt-4'>
                  <label htmlFor='area' className='block text-lg font-medium text-gray-500'>
                    Area
                  </label>
                  <div className='mt-1'>
                  <input type="text" value={address.area} onChange={(e) => setAddress({ ...address, area: e.target.value })} />
                  </div>
                </div>
                <div className='sm:col-span-3 mt-4'>
                  <label htmlFor='city' className='block text-lg font-medium text-gray-500'>
                    City
                  </label>
                  <div className='mt-1'>
                  <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    
                  </div>
                </div>
                <div className='sm:col-span-3 mt-4'>
                  <label htmlFor='state' className='block text-lg font-medium text-gray-500'>
                    State
                  </label>
                  <div className='mt-1'>
                  <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                  
                  </div>
                </div>
                 <div className='sm:col-span-3 mt-4'>
                  <label htmlFor='country' className='block text-lg font-medium text-gray-500'>
                    Country
                  </label>
                  <div className='mt-1'>
                    <select
                      id='country'
                      name='country'
                      autoComplete='country-name'
                      className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-md border-gray-300 rounded-md'
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    >
                      <>
                        <option selected disabled>
                          Select A Country
                        </option>
                        {countries.map((country) => (
                          <option key={country.code}>{country.name}</option>
                        ))}
                      </>
                    </select>
                  </div>
                </div>
                {/* <div className='sm:col-span-3 my-4'>
                  <label htmlFor='postal-code' className='block text-lg font-medium text-gray-500'>
                    ZIP / Postal code
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='postal-code'
                      id='postal-code'
                      autoComplete='postal-code'
                      value={address.postal}
                      onChange={(e) => setAddress({ ...address, postal: e.target.value })}
                      className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div> */}
                <button
                  onClick={() =>
                    address.line && address.area && address.city && address.state && address.country
                      ? setStep("payment")
                      : toast.error("Please check your address.")
                  }
                  type='button'
                  className='my-4 w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800'
                >
                  Continue
                  <MdDoubleArrow className='ml-1 -mr-1 mt-1 h-4 w-4' aria-hidden='true' />
                </button>
              </div>
            )}
            {step === "payment" && (
              <div data-aos='fade-left'>
                <div className='my-4'>
                  <label htmlFor='coupon' className='block text-lg font-medium text-gray-500'>
                    Coupon <span className='font-base text-gray-400 text-sm'>(Optional)</span>
                  </label>
                  <div className='mt-1 flex items-center justify-between'>
                    <input
                      type='text'
                      name='coupon'
                      id='coupon'
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className='shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-[75%] sm:text-sm border-gray-300 rounded-md'
                      placeholder='Enter coupon'
                    />
                    <button
                      type='button'
                      className='w-[22%] inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200'
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <button
                  type='button'
                  onClick={handlePay}
                  className='my-4 w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800'
                >
                  Pay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center w-[50%] h-screen bg-gray-900'>
        <div className='w-[65%] mx-auto'>
          <h1 className='block text-xl leading-6 text-cyan-300 font-semibold'>
            {plan?.name} Package
          </h1>
          <span className='text-white text-4xl font-bold'>
            ₹
            {pages && (
              <span className="mx-3">
                {/* {JSON.stringify(pages*3)} */}
                {amount}
              </span>
            )}
            INR
          </span>
          <p className='text-md text-gray-400 my-5 '>
          
          </p>
          <div className='rounded-lg bg-black bg-opacity-25 divide-y divide-gray-600 divide-opacity-25 text-base leading-6 font-semibold'>
            <div className='p-6 flex justify-between text-white'>
              <dt>Subtotal</dt>
              <dd>
                <span>
                 
                  {/* ₹{plan && (plan?.price - (payment?.plan && payment?.plan!="free" ? payment?.planPrice : 0)).toFixed(2)}{" "} */}
                  ₹
            {pages && (
              <span className="mx-3">
                {/* {JSON.stringify(pages*3)} */}
                {amount}
              </span>
            )}
            INR
                </span>
              </dd>
            </div>
            <div className='p-6 flex justify-between text-gray-400'>
              <dt>
                <span>Total Pages</span>
                {/* <span> </span> */}
              </dt>
              <dd>
                <span x-text="tax !== null ? tax : ''">
                  {pages}
                </span>
              </dd>
            </div>
            <div className='p-6 flex justify-between text-white'>
              <dt>Total price</dt>
              <dd>
                <span>
                      ₹
                  {pages && (
                    <span className="mx-3">
                      {/* {JSON.stringify(pages*3)} */}
                      {amount}
                    </span>
                  )}
                  INR
                </span>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
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

  return {
    props: {
      userDetails: JSON.stringify(user),
      id: query.id,
    },
  };
};

export default CheckoutSlug;
