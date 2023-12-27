import React, { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import { NotificationManager } from "react-notifications";
import Link from "next/link";

export default function Signup({ data }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const sign = async () => {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return NotificationManager.error("Please enter your email or password");
    }

    console.log( "salt",process.env.DATABASE_URL);

    const hashedPassword = bcrypt.hashSync(
      passwordRef.current.value,
      process.env.salt
    );
    const cred = {
      email: emailRef.current.value,
      password: hashedPassword,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(cred),
    };

    NotificationManager.info("Loading.......", "Info");

    try {
      const response = await fetch("/api/cloudFile/signup", options);
      const data = await response.json();
      if (data.id) {
        localStorage.setItem("cloud-user", data.id);
        localStorage.setItem("cloud-email", emailRef.current.value);
        NotificationManager.success("Signup was successfully", "Success");
        window.location.href = "/";
      } else if ((response.message = "User already exists")) {
        NotificationManager.error("User already exists", "Error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="form">
        <h2 className="white">Signup</h2>
        <div>
          <input className="input" ref={emailRef} placeholder="Enter Email" />
        </div>

        <div>
          <input
            className="input"
            type="password"
            ref={passwordRef}
            placeholder="Enter Password"
          />
        </div>

        <div>
          {/*   eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <Link href="/login">Login</Link>
        </div>

        <button className="but" onClick={sign}>
          Signup
        </button>
      </div>
    </div>
  );
}