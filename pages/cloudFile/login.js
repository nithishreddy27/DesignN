import React, { useState, useRef } from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <div className="form">
        <h2 className="white">Login</h2>
        <div>
          <input className="input" placeholder="Enter Email" />
        </div>

        <div>
          <input
            className="input"
            placeholder="Enter Password"
            type="password"
          />
        </div>

        <div>
          {/*  eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <Link href="/cloudFile/signup">Signup</Link>
        </div>

        <button className="but">Login</button>
      </div>
    </div>
  );
}