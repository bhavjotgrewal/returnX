import { Navbar } from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "ReturnX - AI-powered Return Analysis",
  description: "AI-powered return analysis and consulting platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
