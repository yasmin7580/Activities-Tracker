import { CircleUser, House, Layers } from 'lucide-react';

import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='fixed bottom-0 w-full p-2 z-50 backdrop-blur-[1px]'>
            <div className='border-t rounded-4xl bg-[#0f1629] z-99  shadow-[0_-8px_30px_rgba(0,0,0,0.35)]   border-gray-400 p-4'>

                <div className='px-5'>
                    <ul className='flex justify-between *:text-gray-300'>
                        <li className='flex flex-col justify-center items-center'><NavLink to={"/"} className="text-sm" ><House size={26} /></NavLink></li>
                        <li className='flex flex-col justify-center items-center'> <NavLink to={"/all-activities"} className="text-sm"><Layers size={26} /></NavLink></li>
                        <li className='flex flex-col justify-center items-center'> <NavLink to={"/profile"} className="text-sm"><CircleUser size={26} /></NavLink></li>
                    </ul>



                </div>
            </div>


        </div>
    );
};

export default Navbar;