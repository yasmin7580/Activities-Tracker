import { Toaster } from 'react-hot-toast';
import BottomNavigationBar from '../Components/SharedComponent/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='min-h-dvh'>
            <Toaster></Toaster>
            <BottomNavigationBar></BottomNavigationBar>
            <div className='pb-16 bg-[#0f1629]'>
                <Outlet></Outlet>
            </div>

            {/* <TaskForm></TaskForm>  */}
            {/* profile  */}
            {/* All activities */}
        </div>
    );
};

export default Root;