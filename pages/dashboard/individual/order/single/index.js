import React, { useState } from 'react'
import { findUser } from '../../../../../src/lib/user';
import { getLoginSession } from '../../../../../src/lib/auth';
import { DropDown } from '../../../../../src/components/Reusables/Dropdown';

export default function Index({userDetails}) {
  const user = JSON.parse(userDetails);
  console.log(user);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);
  const [imageUrl, setImageUrl] = useState()
  const services = [
    { name: "Tshirt Printing", code: "TshirtPrinting" },
    { name: "Book Binding", code: "BookBinding" },
    { name: "Poster Printing", code: "PosterPrinting" },
    { name: "Visiting/Business Cards Printing", code: "V/BCardsPrinting" },  
  ]

  const [selectedService, setSelectedService] = useState(services[0])

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleImageUpload = async (event) => {
    // setloadin(true);
    const file = event.target.files[0];
    console.log(file);
    const formD = new FormData();
    formD.append("file", file);
    formD.append("upload_preset", "vo99iup5");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dvl0qtkko/image/upload",
      {
        method: "POST",
        body: formD,
      }
    )
      .then((r) => r.json())
      .then((r) => {
        // formData.logo = r.secure_url;
        console.log("data in", r.secure_url);
        if(r.secure_url){
          setImageUrl(r.secure_url)
        }
      });
    // setloading(false);
    // console.log("data out", formData);
  };


  return (
    <div className='mt-24 mx-24'>

      <div >
        <form action="../../../api/orders" method='POST'>
          <div className='flex flex-col'>
          <div className='m-5'>
            
            <label htmlFor="name">Your ID</label>
            <input type="text" name="id" id="id" value={user._id}/>
            </div>
            <div className='m-5'>

            <label htmlFor="name">Name </label>
            <input type="text" name="name" id="name"/>
            </div>
            <div className='m-5'>

            <label htmlFor="productName">Product Name </label>
            <input type="text" name="productName" id="productName" />
            </div>

            <div className='m-5'>

            <label htmlFor="serviceSelect" className="">
            Type of Service:
          </label>
          <select
            id="serviceSelect"
            className="px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleServiceChange}
            value={selectedService}
            name='services'
          >
            <option value="">Select a service</option>
            {services.map((service, index) => (
              <option key={index} value={service.code}>
                {service.name}
              </option>
            ))}
          </select>
            </div>
            <div className='m-5'>

            <label htmlFor="number">Number of products </label>
            <input type="text" name="number" id="number" />
            </div>

            
            <div className='m-5'>

            <div className="">
            <label htmlFor="name">Image </label>

          <input
            type="file"
            name="logo"
            onChange={handleImageUpload}
            className="w-full px-5 py-3 focus:outline-none rounded-md focus:border-gray-500 text-center"
            placeholder="Logo"
            required
          />
          <p className="text-xs px-5">Upload JPG/JPEG</p>

          <input type="text" id="productImage" name="productImage" value={imageUrl} onChange={()=>{}}/>
        </div>

            
            {/* <input type="file" id="productImage" name="productImage"/> */}
            </div>
            <div className='m-5'>
              <label htmlFor="name">Phone Number </label>
              <input type="text" name="phoneNumber" id="phoneNumber" />
            </div>
            <div className='m-5'>
              <label htmlFor="name">Delivery by</label>
              <input type="date" name="date" id="date" />
            </div>
            <div className='m-5'>
              <label htmlFor="name">Email </label>
              <input type="text" name="email" id="email" />
            </div>
           

            <div  className=''>
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
                    <input type="text" name="addLineOne" id="addLineOne"  />
                  </div>
                </div>
                <div className='sm:col-span-3 mt-4'>
                  <label htmlFor='area' className='block text-lg font-medium text-gray-500'>
                    Area
                  </label>
                  <div className='mt-1'>
                  <input type="text"  name="area" id="area"  />
                  </div>
                </div>
                <div className='sm:col-span-3 mt-4'>
                  <label htmlFor='city' className='block text-lg font-medium text-gray-500'>
                    City
                  </label>
                  <div className='mt-1'>
                  <input type="text"  name="city" id="city"  />
                    
                  </div>
                </div>
                <div className='sm:col-span-3 mt-4'>
                  <label htmlFor='state' className='block text-lg font-medium text-gray-500'>
                    State
                  </label>
                  <div className='mt-1'>
                  <input type="text" name="state" id="state"   />
                  
                  </div>
                </div>



             

                {/* <DropDown
                        title="Service"
                        name = "Servicess"
                        options={services}
                        selectedOption={selectedService}
                        setSelectedOption={setSelectedService}
                      /> */}
                 {/* <div className='sm:col-span-3 mt-4'>
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
                </div> */}
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
                
              </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

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

