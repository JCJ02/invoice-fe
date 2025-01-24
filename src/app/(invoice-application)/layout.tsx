import SideNavigationBar from "@/layouts/SideNavigationBar";
import NavigationBar from "@/layouts/NavigationBar";
import "../globals.css";

export default function InvoiceApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-full w-full">
        <SideNavigationBar />
        <div className="flex flex-col h-screen w-10/12 md:w-11/12">
          <NavigationBar />
          {children}
        </div>
      </div>
    </>
  );
}
