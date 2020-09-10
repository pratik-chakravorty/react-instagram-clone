import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ShowAlert from "./ShowAlert";
import { login as loginAction } from "../../actions/authActions";
import { Input, SubmitButton, Error } from "../../styles/CommonStyles";
import logo from "../../static/logo.png";

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
    font-weight: 500;
  }
  span {
    color: ${(props) => props.theme.blue};
    cursor: pointer;
    font-weight: bolder;
  }
`;

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().min(6),
});

function Login() {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alerts);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    dispatch(loginAction(formData));
  };
  if (isAuthenticated) {
    return <Redirect to="/feed" />;
  }
  return (
    <React.Fragment>
      {alerts &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <ShowAlert
            key={alert.id}
            msg={alert.msg}
            alertType={alert.alertType}
            id={alert.id}
          />
        ))}
      <LoginWrapper>
        <img className="logo" src={logo} alt="insta-logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input ref={register} type="email" name="email" placeholder="Email" />
          {errors.email && <Error>{errors.email.message}</Error>}
          <Input
            ref={register}
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <SubmitButton
            type="submit"
            value="Log In"
            disabled={!formState.isValid}
            className="login"
          />
        </form>
      </LoginWrapper>
      <SignUpLink>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </SignUpLink>
    </React.Fragment>
  );
}

export default Login;
