import React, {useState} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          // Dispatch login action
          const result = await dispatch(loginUser({ username, password }));
          
          // If login is successful (assuming the response contains token)
          if (result.type === 'auth/loginUser/fulfilled') {
            // Redirect to the home page after a successful login
            navigate('/home');
          }
        } catch (err) {
          console.error("Login failed: ", err);
        }
      };
    return (
        <>
            <Container>
                <Content>
                    <Card>
                        <LogoSection>
                            <Logo src="/images/cta-logo-one.svg" alt="logo" />
                            <Description>
                                Get Premier Access to Raya and the Last Dragon for an additional fee
                                with a Disney+ subscription. As of 03/26/21, the price of Disney+
                                and The Disney Bundle will increase by $1.
                            </Description>
                            <CTALogoTwo src="/images/cta-logo-two.png" alt="" />
                        </LogoSection>

                        <FormSection>
                            <h2>Enter your Credentials</h2>
                            <form onSubmit={handleLogin}>
                                <InputField 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} 
                                    placeholder="Enter Username" />
                                <InputField 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="mt-2" placeholder="Enter Password" />
                                <Button type="submit">Continue</Button>
                                <GButton>Continue with Google+</GButton>
                            </form>
                        </FormSection>
                    </Card>
                    <BgImage />
                </Content>
            </Container>
        </>
    )
}


const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
`;

const Content = styled.div`
    margin-bottom: 10vw;
    width: 100%;
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 80px 40px;
    height: 100%;
    
`;

const BgImage = styled.div`
    height: 100%;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("/images/login-background.jpg");
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
`;

const Card = styled.div`
  min-width: 70%;
  width: 300px;
  padding: 2rem;
  background-color: #040714;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgb(0,0,0,0.5);
  display: flex;
  flex-direction: row
  align-items: center;
  justify-content: space-between
`;

const LogoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding-right: 1rem;
`;

const Logo = styled.img`
  margin-bottom: 12px;
  max-width: 300px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const Description = styled.p`
   color: hsla(0, 0%, 95.3%, 1);
   font-size: 14px;
   margin: 0 0 24px;
   line-height: 1.2;
   letter-spacing: 1.2px;
   
`;

const CTALogoTwo = styled.img`
    max-width: 300px;
    margin-bottom: 20px;
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-left: 1rem;
    border-left: 1px solid #444
`;

const InputField = styled.input`
   width: 100%;
   padding: 10px;
   margin-top: 10px;
   border: 1px solid #444;
   border-radius: 8px;
   background-color: #222;
   color: white;
   font-size: 16px;

   &:focus {
      outline: none;
      border-color: #1e90ff
   }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    background-color: #1e90ff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover:{
       background-color: #0073e6;
    }
`;

const GButton = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    background-color: #D10000
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover:{
       background-color: #D10000 !important;
    }
`;



export default Signin