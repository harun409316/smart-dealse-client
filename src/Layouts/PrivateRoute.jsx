import React, { Children, use } from 'react';
import { AuthContext } from '../Context/AuthContex';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading}= use(AuthContext);
    const location = useLocation();

    // user load hocce ekhono 
    if(loading){
        return <div className='flex justify-center items-center h-screen'><span className='loading loading-spinner loading-lg'></span></div>;
    }
    // jodi user na thake 
    if(!user){
        return <Navigate to='/register' state={{from:location}} replace/>;
    }
   
    return  children;
};

export default PrivateRoute;