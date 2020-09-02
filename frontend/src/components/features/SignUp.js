import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Input, SubmitButton, Error } from "../../styles/CommonStyles";
import logo from "../../static/logo.png";

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

const schema = yup.object().shape({
  email: yup.string().required().email(),
  fullname: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().min(6),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function SignUp() {
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <React.Fragment>
      <SignUpWrapper>
        <img className="logo" src={logo} alt="insta-logo" />
        <h2>Sign up to see photos from your friends.</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input ref={register} type="email" name="email" placeholder="Email" />
          {errors.email && <Error>{errors.email.message}</Error>}
          <Input
            ref={register}
            type="text"
            name="fullname"
            placeholder="Full Name"
          />
          {errors.fullname && <Error>{errors.fullname.message}</Error>}
          <Input
            ref={register}
            type="text"
            name="username"
            placeholder="Username"
          />
          {errors.username && <Error>{errors.username.message}</Error>}
          <Input
            ref={register}
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <Input
            ref={register}
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
          />
          {errors.passwordConfirm && (
            <Error>{errors.passwordConfirm.message}</Error>
          )}
          <SubmitButton
            type="submit"
            disabled={!formState.isValid}
            value="Sign Up"
          />
        </form>
      </SignUpWrapper>
      <LoginLink>
        <p>
          Have an account? <Link to="/">Log In</Link>
        </p>
      </LoginLink>
    </React.Fragment>
  );
}

export default SignUp;
