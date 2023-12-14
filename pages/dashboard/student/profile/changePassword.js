import React, { useState } from "react";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import { Router, useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import crypto from "crypto";

export default function changePassword({ userDetails }) {
  const user = JSON.parse(userDetails);
  const router = useRouter();
  const [currentPassword, setcurrentPassword] = useState("Provast@123");
  const [newPassword, setnewPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();

  async function changePassword(e) {
    const body = {
      user: user,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    try {
      if (newPassword === confirmPassword) {
        const res = await fetch("/api/student/changePassword", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.status == 200) {
          toast.success("Password changed", {
            toastId: "Password changed",
          });
        } else {
          toast.error("Wrong Password ", {
            toastId: "Wrong Password ",
          });
        }
      } else {
        toast.error("Password not matched", {
          toastId: "Password not matched",
        });
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      // setLoading(false);
      // setErrorMsg(error.message);
      toast.error("error", {
        toastId: "error",
      });
    }

    setnewPassword("");
    setconfirmPassword("");
    router.push("/dashboard/student");
  }
  return (
    <div className="background min-h-[100vh] bg-gray-50 w-full flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-1/2">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto w-full">
            <div className="relative w-48 h-16 mx-auto cursor-pointer">
              <Link href={"/"}>
                <Image
                  placeholder="blur"
                  blurDataURL="https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png"
                  layout="fill"
                  objectFit="contain"
                  className=""
                  src="https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png"
                  alt=""
                />
              </Link>
            </div>
            <h2 className="text-center pt-2 text-xl font-semibold text-gray-900">
              Update With New Password
            </h2>
          </div>
          <div className="mt-2 pt-1">
            <label
              htmlFor="email"
              className="block  font-semibold text-black py-4"
            >
              Email : <span>{user.email}</span>
            </label>
            {/* <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
                onChange={() => {}}
              />
            </div> */}
          </div>
          <div className="flex gap-5">
          <div className="mt-2  pt-1 grow">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 ">
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => {
                  setnewPassword(e.target.value);
                }}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-2 pt-1 grow">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>
          </div>

          <button
            onClick={changePassword}
            className="w-full flex mt-4 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-orange-500"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  const defaultPassword = "Provast@123";
  if(user){
    const inputHash = crypto.pbkdf2Sync(defaultPassword, user.salt, 1000, 64, "sha512").toString("hex");
  const passwordsMatch = user.hash === inputHash; 
  if (!passwordsMatch) {
    return {
      redirect: {
        destination: "/dashboard/student",
        permanent: false,
      },
    };
  }
  
}
  return {
    props: { userDetails: JSON.stringify(user) },
  };
};
