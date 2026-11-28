import { Lottie } from 'lottie-react';
import React from 'react';
import animate from "../../assets/authenticationLoading.json"

const AuthenticationLoading = () => {
    return (
        <div className='h-dvh w-dvw flex justify-center items-center '>
            {/* <span className="loading loading-spinner text-error"></span> */}
            <Lottie src={animate} autoplay loop />
        </div>
    );
};

export default AuthenticationLoading;