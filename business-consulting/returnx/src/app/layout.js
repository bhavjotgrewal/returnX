import { Navbar } from "@/components/Navbar";
import './globals.css';

export const metadata = {
  title: 'ReturnX - AI Analytics',
  description: 'Improve your returns process with AI analytics and consulting',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 overflow-x-hidden">
        <Navbar />
        <div className="overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}