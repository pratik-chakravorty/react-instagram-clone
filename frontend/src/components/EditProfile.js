import React from "react";
import styled from "styled-components";
import logo from "../static/logo.png";

const EditProfileWrapper = styled.div`
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

function EditProfile() {
  return (
    <React.Fragment>
      <EditProfileWrapper>
        <h2>Edit your Profile</h2>
        <img className="logo" src={logo} alt="insta-logo" />
        <form>
          <div className="input-control">
            <label>Name</label>
            <input type="text" placeholder="Enter Fullname" />
          </div>
          <div className="input-control">
            <label>Username</label>
            <input type="text" placeholder="Enter Username" />
          </div>
          <div className="input-control">
            <label>Website</label>
            <input type="text" placeholder="Enter Website" />
          </div>
          <div className="input-control">
            <label>Bio</label>
            <input type="text" placeholder="Enter Bio" />
          </div>
        </form>
      </EditProfileWrapper>
    </React.Fragment>
  );
}

export default EditProfile;
