import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import './globals.css';

export const metadata = {
  title: 'ReturnX - AI Analytics',
  description: 'Improve your returns process with AI analytics and consulting',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen relative pb-40">
        <div className="flex w-full">
          <Navbar />
          <div className="flex-1 flex justify-center overflow-x-hidden">
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}