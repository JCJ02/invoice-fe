import { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Sign In - Invoice Application",
};

export default function InvoiceApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
