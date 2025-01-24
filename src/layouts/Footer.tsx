import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="fixed bottom-0 flex flex-col lg:flex-row lg:justify-between items-center px-8 py-5 w-full">
        <label className="font-poppins text-xs md:text-sm text-white">
          &copy; Copyright 2024 All Right Reserved.
        </label>
        <div className="flex items-center font-poppins text-xs md:text-sm text-white gap-2">
          <Link href={"*"}>Contact Us</Link>
          <label>|</label>
          <Link href={"*"}>Terms & Conditions</Link>
          <label>|</label>
          <Link href={"*"}>Privacy Policy</Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
