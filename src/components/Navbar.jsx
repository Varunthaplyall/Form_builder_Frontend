import React from "react";
import { PlusCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-white mr-3" />
            <span className="text-xl font-bold text-white">Form Builder</span>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/form"
              className="text-white hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md flex items-center"
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Create Form
            </Link>
            <Link
              to="/all"
              className="text-white hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md flex items-center"
            >
              <FileText className="h-5 w-5 mr-2" /> My Forms
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
