"use client";

import React, { useEffect } from "react";

const ViewClient = () => {
  useEffect(() => {
    document.title = "View Client - Invoice Application";
  }, []);
  return <>View Client</>;
};

export default ViewClient;
