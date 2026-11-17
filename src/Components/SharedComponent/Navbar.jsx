import { CircleUser, House, Layers } from 'lucide-react';

import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='fixed bottom-0 w-full border-t rounded bg-[#0f1629] z-10     border-gray-400 p-2'>
            <div className=''>
                <ul className='flex justify-between *:text-gray-300'>
                    <li className='flex flex-col justify-center items-center'><House size={18} /><NavLink to={"/"} className="text-sm" >Home</NavLink></li>
                    <li className='flex flex-col justify-center items-center'><Layers size={18} /> <NavLink to={"/all-activities"} className="text-sm">All Activities</NavLink></li>
                    <li className='flex flex-col justify-center items-center'><CircleUser size={18} /> <NavLink to={"/profile"} className="text-sm">Profile</NavLink></li>
                </ul>



            </div>


        </div>
    );
};

export default Navbar;