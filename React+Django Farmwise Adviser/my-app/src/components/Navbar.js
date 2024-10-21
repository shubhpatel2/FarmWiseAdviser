import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="FarmviseAdvaser Logo" className="h-10 w-10 rounded-full mr-2" />
        <span className="text-white text-xl font-bold">FarmviseAdvaser</span>
      </div>
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
        <li><Link to="/soil1" className="text-white hover:text-gray-300">Crop Prediction</Link></li>
        <li><Link to="/weather" className="text-white hover:text-gray-300">Weather Prediction</Link></li>
        <li><Link to="/disease" className="text-white hover:text-gray-300">Disease Prediction</Link></li>
        <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
