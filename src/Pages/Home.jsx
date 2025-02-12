import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logout, refreshToken } from "../slices/authSlice";
import Signin from "../component/Signin"
import styled from "styled-components";
import { ImgSlider, Viewers, Recommends, TVShows, Trending, MostPopular } from "./config";

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
        <>
         
            <Container>
               <ImgSlider />
               <Viewers />
               <Recommends />
               <MostPopular />
               <TVShows />
           </Container>
         
           
        </>
     )
}


const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;