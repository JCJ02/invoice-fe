import SideNavigationBar from "@/components/SideNavigationBar";
import NavigationBar from "@/components/NavigationBar";
import "../globals.css";

export default function InvoiceApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen w-full">
        <SideNavigationBar />
        <div className="w-full">
          <NavigationBar />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
