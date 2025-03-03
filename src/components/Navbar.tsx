import { NavLink } from "react-router-dom";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <nav className='bg-white shadow'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <NavLink className='flex items-center' to='/'>
            <Github className='h-8 w-8 text-gray-800' to='/' />
            <span className='ml-2 text-xl font-semibold'>GitHub Stats</span>
          </NavLink>
          <div className='flex space-x-4'>
            <NavLink
              to='/'
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Search
            </NavLink>
            <NavLink
              to='/history'
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              History
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
