import React from "react";
import styled from "styled-components";
import logo from "../static/logo.png";

const SignUpWrapper = styled.div`
  max-width: 350px;
  background-color: ${(props) => props.theme.white};
  text-align: center;
  margin: 4rem auto 0.3rem auto;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.borderColor};

  img {
    margin-bottom: 1.3rem;
  }

  h2 {
    font-size: 17px;
    color: ${(props) => props.theme.heading2};
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 10px;
    text-align: center;
  }

  input {
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 0.5rem 1.2rem;
    background: ${(props) => props.theme.bg};
    border: 1px solid ${(props) => props.theme.borderColor};
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    border-radius: 4px;
    width: 85%;
  }

  input[type="submit"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.blue};
  }

  p {
    margin-top: 2rem;
  }
`;

const LoginLink = styled.div`
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 350px;
  text-align: center;
  padding: 2rem;
  margin: 0.5rem auto;
  p {
    color: ${(props) => props.theme.paragraphColor};
    font-weight: 100;
  }
  span {
    color: ${(props) => props.theme.blue};
    cursor: pointer;
    font-weight: bolder;
  }
`;

function SignUp() {
  return (
    <React.Fragment>
      <SignUpWrapper>
        <img className="logo" src={logo} alt="insta-logo" />
        <h2>Sign up to see photos from your friends.</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="submit" value="Sign Up" />
        </form>
      </SignUpWrapper>
      <LoginLink>
        <p>
          Have an account? <span>Log In</span>
        </p>
      </LoginLink>
    </React.Fragment>
  );
}

export default SignUp;
