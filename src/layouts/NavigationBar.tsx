"use client";

import Image from "next/image";
import React from "react";
import adminProfile from "../assets/images/admin-profile.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

const NavigationBar = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("refreshToken");
    toast.success("Logged Out Successfully!", {
      toastId: "loggedOutSuccess",
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    router.push("/sign-in");
  };
  return (
    <>
      <div className="flex border-[#BBBBBB] border-b-2 h-20">
        <nav className="flex justify-end items-center h-full w-full">
          <DropdownMenu>
            <DropdownMenuTrigger>
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
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-poppins text-xs md:text-sm lg:text-md cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </>
  );
};

export default NavigationBar;
