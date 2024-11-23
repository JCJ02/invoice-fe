"use client";

import Image from "next/image";
import React from "react";
import adminProfile from "../assets/images/admin-profile.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useUser } from "@/context/UserContext";

const NavigationBar = () => {
  const { user } = useUser();
  return (
    <>
      <div className="flex border-[#BBBBBB] border-b-2 h-[80px]">
        <nav className="flex justify-end items-center w-full">
          <div className="flex items-center px-8 gap-2 cursor-pointer">
            <Image
              src={adminProfile}
              alt="Admin Profile"
              height={30}
              width={30}
            />
            <label className="font-poppins text-xs md:text-sm lg:text-md cursor-pointer">
              {user ? `${user.firstname} ${user.lastname}` : "Admin"}
            </label>
            <MdOutlineKeyboardArrowDown className="text-xl" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavigationBar;
