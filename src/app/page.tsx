"use client";

import useAuthentication from "@/hooks/useAuthentication";
import { useEffect } from "react";

export default function Home() {
  useAuthentication();

  useEffect(() => {
    document.title = "Invoice Application";
  }, []);
  return <></>;
}
