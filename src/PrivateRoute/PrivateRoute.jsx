import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Navigate } from 'react-router';
import AuthenticationLoading from '../Components/Loading/AuthenticationLoading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <AuthenticationLoading></AuthenticationLoading>
    }
    if (!user) {
        return <Navigate to={"/sign-in"}></Navigate>
    }

    return children
};

export default PrivateRoute;