import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Loading } from "../../../src/components/Reusables/Loading";
import { getLoginSession } from "../../../src/lib/auth";
import { genders } from "../../../src/lib/helper";
import { useUser } from "../../../src/lib/hooks";
import { findUser } from "../../../src/lib/user";
import { DropDown } from "../../../src/components/Reusables/Dropdown";
import { mutate } from "swr";

const typeOfCategory = [
  { id: "individual", name: "individual" },
  { id: "college", name: "college" },
];
const Details = ({  user }) => {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState({
    value: "",
    verified: false,
    frozen: false,
  });
  const [loading, setLoading] = useState(false);
  const [collegeSearchValue, setCollegeSearchValue] = useState("");
  const [collegeList, setCollegeList] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownState, setDropDownState] = useState(false);
  const [selectedGender, setSelectedGender] = useState(genders[0]);
  const [category, setCategory] = useState("individual");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    image: user?.profile?.image,
    gender: selectedGender.name,
    dob: null,
    verified: false,
    frozen: false,
  });
  const [phone, setPhone] = useState({
    value: null,
    verified: false,
    frozen: false,
  });
  const [college, setCollege] = useState({
    name: "",
    code: "",
    passphrase: "",
    website: "",
    phone:"",
    verified: false,
    frozen: false,
  });
  const session = useUser();

  const [verified, setVerified] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/user/details?userId=${session?._id}`,
        {
          profile,
          phone,
          rollNumber,
          category,
          college,
          approved: !(category === "college"),
          detailsAvailable: true,
        }
      );

  

      setLoading(false);
      if (data.message === "Details Updated") {
        await mutate("/api/user");
        toast.success("User Details Created.", {
          toastId: "User Details Created.",
        });
        if (category === "individual") {
          router.push("/dashboard/individual");
        } else router.push("/dashboard/individual");
      }
    } catch (e) {
      toast.error(e.response.data.message, {
        toastId: e.response.data.message,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      collegeSearchHandler();
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [collegeSearchValue]);

  const collegeSearchHandler = async () => {
    if (collegeSearchValue === "") return;
    const {
      data: { colleges },
    } = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/college?search=${collegeSearchValue}`
    );
    setCollegeList(colleges);
    if (!dropDownState) setShowDropDown(true);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Provast | Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="background">
        {loading && <Loading />}
        <div className="min-h-screen flex flex-col justify-center items-center pb-4 sm:px-6 lg:px-8">
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-2xl">
            <div className="bg-white pt-1 pb-8 shadow-xl rounded-xl px-10">
              <div className="my-6 flex justify-between items-center">
                <div className="">
                  <span className="text-xs font-semibold">Signed In As : </span>
                  <span className="text-sm font-bold text-gray-600">
                    {session?.email}
                  </span>
                </div>
                <button className="font-semibold text-orange-600 text-sm underline hover:text-orange-800">
                  <a href="/api/auth/logout">Logout</a>
                </button>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-2 text-center text-3xl font-bold text-gray-900">
                  Fill in your details
                </h2>
              </div>
              <form onSubmit={submitHandler}>
                <fieldset className="mt-4">
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {typeOfCategory.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={option.id}
                          name="notification-method"
                          type="radio"
                          value={option.name}
                          defaultChecked={option.id === "individual"}
                          onChange={(e) => setCategory(e.target.value)}
                          className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                        />
                        <label
                          htmlFor={option.id}
                          className="ml-3 block text-sm font-medium capitalize text-gray-700"
                        >
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                <React.Fragment>
                 

                  <div className="grid grid-cols-6 gap-6 mt-4">
                    <div
                      className={`col-span-6 sm:col-span-${
                        category === "individual" ? "3" : "2"
                      } `}
                    >
                      <div className="flex">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <span className="ml-1 text-red-600 font-semibold">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        disabled={category === "individual" && !verified}
                        required
                        value={profile.firstName}
                        onChange={(e) =>
                          setProfile({ ...profile, firstName: e.target.value })
                        }
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div
                      className={`col-span-6 sm:col-span-${
                        category === "individual" ? "3" : "2"
                      } `}
                    >
                      <div className="flex">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <span className="ml-1 text-red-600 font-semibold">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        disabled={category === "individual" && !verified}
                        required
                        value={profile.lastName}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                   
                    <div
                      className={`col-span-6 sm:col-span-${
                        category === "individual" ? "3" : "2"
                      } relative -top-[23px]`}
                    >
                      <DropDown
                        isRequired
                        title="Gender"
                        options={genders}
                        selectedOption={selectedGender}
                        setSelectedOption={setSelectedGender}
                      />
                    </div>
                  </div>

                  
                    <div className="grid grid-cols-6 gap-6">
                      
                      <div className="col-span-6 sm:col-span-3 mt-4">
                        <div className="flex">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <span className="ml-1 text-red-600 font-semibold">
                            *
                          </span>
                        </div>

                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          autoComplete="tel"
                          required
                          disabled={category === "individual" && !verified}
                          pattern="[6789][0-9]{9}"
                          value= {phone.value}
                          onChange={(e) => {
                            setPhone({ ...phone, value: e.target.value });
                          }}
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
               



                

                 
                  <div className="mt-4">
                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 ">
                      Submit
                    </button>
                  </div>
                </React.Fragment>
              </form>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps = async function ({ req, res }) {
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
  if(user && user?.category == "student"){
    return {
      redirect: {
        destination: "/auth/user/academics",
        permanent: false,
      },
    };
  }

  if (user && user?.detailsAvailable) {
    if (user.category === "individual")
      return {
        redirect: {
          destination: "/auth/user/academics",
          permanent: false,
        },
      };
    else
      return {
        redirect: {
          destination: "/dashboard/" + user?.category,
          permanent: false,
        },
      };
  }


  return {
    props: {  },
  };
};

export default Details;
