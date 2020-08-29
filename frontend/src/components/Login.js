import React from "react";
import styled from "styled-components";
import logo from "../static/logo.png";

const LoginWrapper = styled.div`
  max-width: 350px;
  background-color: ${(props) => props.theme.white};
  text-align: center;
  margin: 4rem auto 0.3rem auto;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.borderColor};

  img {
    margin-bottom: 1.4rem;
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

const SignUpLink = styled.div`
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

function Login() {
  return (
    <React.Fragment>
      <LoginWrapper>
        <img className="logo" src={logo} alt="insta-logo" />
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="submit" value="Log In" className="login" />
        </form>
      </LoginWrapper>
      <SignUpLink>
        <p>
          Don't have an account? <span>Sign Up</span>
        </p>
      </SignUpLink>
    </React.Fragment>
  );
}

export default Login;
