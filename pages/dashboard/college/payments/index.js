import React,{useState} from 'react'
import { getLoginSession } from '../../../../src/lib/auth';
import { findUser } from '../../../../src/lib/user';
import { GoSearch } from "react-icons/go";
// import { TiTick } from "react-icons/Ti";

const viewPayments = ({ userDetails }) => {
  const [display, setdisplay] = useState([]);
  const user = JSON.parse(userDetails);
  const id = user._id;
  fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/payment/allpayments/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setdisplay(data);
    })
    .catch((err) => {});

  return (
    <div className="min-h-screen">
      <div className="pt-[10vh] mx-7 mr-7  ">
        <div className="flex m-auto md:relative pt-3 items-center rounded-lg flex-wrap sm:pl-8 md:pl-0 ">
          <h1 className="mt-8 md:mx-6 text-2xl font-bold mb-4  mx-4 md:pl-0">Payment History</h1>
          <div className="flex md:absolute md:right-0  md:mx-2 ">
            <div className="right-1 flex mx-3 mt-4 bg-gray-100 px-3  rounded-md">
              <GoSearch className="mt-2 text-lg" />
              <input
                className="w-full  bg-gray-100 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-sm"
                type="text"
                placeholder="Search a transaction..."
              />
            </div>
            <div>
              <select
                className="border border-gray-300 mt-4 rounded-md  text-gray-600 px-2 pl-2 pr-8 bg-white hover:border-gray-400 focus:outline-none text-xs
           focus:ring-0"
              >
                <option>Filter by</option>
                <option></option>
                <option></option>
              </select>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="bg-orange-500 ">
                <th className="px-6 py-3 text-left text-base text-white font-medium   uppercase tracking-wider">
                  Payment Id
                </th>
                <th className="px-6 py-3 text-left text-base text-white font-medium  uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-base text-white font-medium  uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-base text-white font-medium  uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-base text-white font-medium  uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-300">
              {display.map((item) => {
                return (
                  <tr className="hover:bg-gray-100 border-b border-gray-500">
                    <td className="px-6 py-4 whitespace-nowrap font-mono  text-red-400">
                      {item.paymentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {item.updatedAt.substring(0, 10) +
                        " , " +
                        item.updatedAt.slice(12,19)}
                    </td>
                    {item.plan == "free" ? (
                      <td className="px-6 py-4 whitespace-nowrap text-green-500">
                        {item.plan}
                      </td>
                    ) : (
                      <td className="px-6 py-4 whitespace-nowrap text-blue-800">
                        {item.plan}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">₹{item.amount}</td>
                    <td className="px-6 py-4 font-semibold whitespace-nowrap text-green-600">
                      <div className="flex ">
                        <span className="pt-1">
                          {/* <TiTick /> */}
                        </span>
                        <span className="font-medium">Paid</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
    const session = await getLoginSession(req);
    const user = (session?._doc && (await findUser(session._doc))) ?? null;
    return {
      props: {
        userDetails: JSON.stringify(user),
      },
    };
  };

export default viewPayments;
