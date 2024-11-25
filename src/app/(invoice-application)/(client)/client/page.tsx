"use client";

import Button from "@/components/Button";
import useAuthentication from "@/hooks/useAuthentication";
import React, { useEffect } from "react";

const Client = () => {
  useAuthentication();

  useEffect(() => {
    document.title = "Client - Invoice Application";
  });

  return (
    <>
      <div className="flex flex-col font-poppins gap-5 py-5 pl-4 pr-8 h-full w-full">
        <h1 className="font-semibold text-[#262626] text-md lg:text-2xl">
          Client
        </h1>
        <div>
          <div className="flex justify-between">
            <input
              className="border-2 border-[#EEEEEE] text-xs md:text-md lg:text-lg rounded-md pl-2 lg:pr-44"
              type="text"
              placeholder="Search"
            />
            <Button>New Client</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
