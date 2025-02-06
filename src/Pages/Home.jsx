import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logout, refreshToken } from "../slices/authSlice";


export const Home = () => {
     const dispatch = useDispatch();
     useEffect(() => {
      const checkSession = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          dispatch(refreshToken());
        } else {
          dispatch(logout());
        }
      };
  
      checkSession();
    }, [dispatch]);
     return (
        <>Hello Home</>
     )
}

export default Home;