import { NavLink } from "react-router-dom";
import { Github } from "lucide-react";
import { Button } from "./ui/button";

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
            ><Button className="bg-blue-700 hover:bg-blue-600">
              Search</Button>
            </NavLink>
            <NavLink to='/history'>
              <Button className="text-black border-0">History</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
