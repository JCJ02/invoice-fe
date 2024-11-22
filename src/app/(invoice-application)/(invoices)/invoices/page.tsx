"use client";

import React, { useEffect } from "react";

const Invoices = () => {
  useEffect(() => {
    document.title = "Invoices - Invoice Application";
  });
  return (
    <>
      <div>Invoices</div>
    </>
  );
};

export default Invoices;
