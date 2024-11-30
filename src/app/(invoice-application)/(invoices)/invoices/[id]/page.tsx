"use client";

import React, { useEffect } from "react";

const ViewInvoice = () => {
  useEffect(() => {
    document.title = "View Invoice - Invoice Application";
  }, []);
  return <>View Invoice</>;
};

export default ViewInvoice;
