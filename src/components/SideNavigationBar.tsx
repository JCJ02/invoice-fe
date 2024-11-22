"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import lwsLogo from "../assets/images/lws-logo.png";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

const SideNavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileView, setDesktopView] = useState(false);

  const responsiveView = () => {
    setDesktopView(window.innerWidth < 1024);
  };

  useEffect(() => {
    responsiveView();
    window.addEventListener("resize", responsiveView);
    return () => window.removeEventListener("resize", responsiveView);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
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
      <div className="flex flex-col items-center bg-white [box-shadow:10px_0_20px_0_rgba(0,0,0,0.1)] px-5 h-full w-[78px] lg:w-[280px]">
        <Image className="my-12 lg:w-[144px]" src={lwsLogo} alt="LWS Logo" />
        <div className="flex flex-col justify-between items-center h-full w-full">
          <ul className="flex flex-col items-center lg:items-start gap-4 lg:px-5 w-full">
            <li className="font-poppins text-lg">
              <Link
                className={pathname === "/client" ? "text-[#D2232D]" : ""}
                href={"/client"}
              >
                {isMobileView ? <BsPeople /> : "Client"}
              </Link>
            </li>
            <li className="font-poppins text-lg">
              <Link
                className={pathname === "/invoices" ? "text-[#D2232D]" : ""}
                href={"/invoices"}
              >
                {isMobileView ? <LiaFileInvoiceDollarSolid /> : "Invoices"}
              </Link>
            </li>
          </ul>
          <div className="flex justify-center items-center border-[#BBBBBB] border-t-2 h-[80px] w-full">
            <button
              className="font-poppins text-lg cursor-pointer hover:bg-[#D2232D] hover:text-white hover:px-2 hover:py-1 hover:rounded-sm w-full"
              onClick={handleLogout}
            >
              {isMobileView ? (
                <MdOutlineLogout className="w-full" />
              ) : (
                <div className="flex justify-between items-center w-full">
                  <label className="cursor-pointer">Log out</label>
                  <MdOutlineLogout />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavigationBar;
