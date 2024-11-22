"use client";

import React, { useEffect } from "react";

const Client = () => {
  useEffect(() => {
    document.title = "Client - Invoice Application";
  });
  return (
    <>
      <div>Client</div>
    </>
  );
};

export default Client;
