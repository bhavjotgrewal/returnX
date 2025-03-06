import { Navbar } from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 pl-16 md:pl-60 pt-6 pb-6 pr-6 overflow-auto">
        <main className="animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}