"use client";

import Link from "next/link";
import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found - Invoice Application";
  }, []);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 font-poppins px-8 m-auto h-screen max-w-[1280px]">
        <h1 className="font-bold text-9xl lg:text-[216px]">404</h1>
        <div className="flex flex-col items-center lg:items-start gap-5 lg:gap-2 w-full">
          <div className="flex flex-col items-center lg:items-start gap-2 w-full">
            <p className="font-bold text-xl">Oops!</p>
            <p className="font-bold text-center lg:text-start text-xl">
              The link you clicked may be broken or the page may have been
              removed. We're Sorry!
            </p>
          </div>
          <hr className="border-4 border-[#D1242E] my-5 w-1/2" />
          <div className="flex justify-center items-center lg:justify-start lg:items-start gap-2 w-full">
            <p className="font-bold text-xl">Go back to our </p>
            <Link className="text-[#D1242E] font-bold text-xl" href={"/"}>
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
