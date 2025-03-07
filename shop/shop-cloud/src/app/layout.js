import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'CLOUD - Fashion Store',
  description: 'Comfort. Design. Innovation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <footer className="bg-gray-100 py-10 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">About CLOUD</h3>
                  <p className="text-gray-600">
                    CLOUD is a fashion brand focused on comfort, design, and innovation.
                    We create sustainable clothing that makes you feel good while looking good.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">Customer Service</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-black">Contact Us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-black">Shipping & Returns</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-black">FAQ</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4">Connect</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-black">Instagram</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-black">Twitter</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-black">Facebook</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} CLOUD. All rights reserved.
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}