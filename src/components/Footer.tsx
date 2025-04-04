
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-amazon text-white mt-auto">
      {/* Back to top button */}
      <div className="bg-amazon-light bg-opacity-20 text-center py-3">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-white hover:underline"
        >
          Back to top
        </button>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">About Us</Link></li>
              <li><Link to="#" className="hover:underline">Careers</Link></li>
              <li><Link to="#" className="hover:underline">Press Releases</Link></li>
              <li><Link to="#" className="hover:underline">Community</Link></li>
            </ul>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Sell on MarketGalaxy</Link></li>
              <li><Link to="#" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="#" className="hover:underline">Advertise Your Products</Link></li>
              <li><Link to="#" className="hover:underline">Self-Publish</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-4">Payment Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Business Card</Link></li>
              <li><Link to="#" className="hover:underline">Shop with Points</Link></li>
              <li><Link to="#" className="hover:underline">Reload Your Balance</Link></li>
              <li><Link to="#" className="hover:underline">Currency Converter</Link></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Your Account</Link></li>
              <li><Link to="#" className="hover:underline">Your Orders</Link></li>
              <li><Link to="#" className="hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link to="#" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link to="#" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MarketGalaxy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
