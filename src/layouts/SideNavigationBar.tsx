"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import lwsLogo from "../assets/images/lws-logo.png";
import lwsFavicon from "../assets/images/lws-favicon.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SideNavigationBar = () => {
  const pathname = usePathname();

  const [isMobileView, setDesktopView] = useState(false);

  const responsiveView = () => {
    setDesktopView(window.innerWidth < 1280);
  };

  useEffect(() => {
    responsiveView();
    window.addEventListener("resize", responsiveView);
    return () => window.removeEventListener("resize", responsiveView);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-white [box-shadow:10px_0_20px_0_rgba(0,0,0,0.1)] px-5 w-2/12 md:w-1/12 xl:w-[280px]">
        {/* LOGO */}
        {isMobileView ? (
          <Image
            className="my-12 w-[50px]"
            src={lwsFavicon}
            alt="LWS Favicon"
          />
        ) : (
          <Image className="my-12 w-[144px]" src={lwsLogo} alt="LWS Logo" />
        )}

        {/* SIDE NAVIGATION BAR BUTTONS */}
        <div className="flex flex-col justify-between items-center h-full w-full">
          <ul className="flex flex-col items-center xl:items-start gap-4 xl:px-5 w-full">
            <li className="font-poppins text-lg">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      className={pathname === "/client" ? "text-[#D2232D]" : ""}
                      href={"/client"}
                    >
                      {isMobileView ? <BsPeople /> : "Client"}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#D2232D]">
                    <label className="text-white text-sm">Client</label>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li className="font-poppins text-lg">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      className={
                        pathname === "/invoices" ? "text-[#D2232D]" : ""
                      }
                      href={"/invoices"}
                    >
                      {isMobileView ? (
                        <LiaFileInvoiceDollarSolid />
                      ) : (
                        "Invoices"
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#D2232D]">
                    <label className="text-white text-sm">Invoices</label>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideNavigationBar;
