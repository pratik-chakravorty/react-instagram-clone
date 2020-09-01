import React from "react";
import styled from "styled-components";

const UploadFormWrapper = styled.div`
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
    background: ${(props) => (!props.upload ? props.theme.bg : "transparent")};
    border: 1px solid ${(props) => props.theme.borderColor};
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    border-radius: 4px;
    width: 85%;
  }

  input[type="file"] {
    background: transparent;
    font-size: 13px;
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

function SignUp() {
  const uploadImage = (e) => {
    console.log("uploading...");
  };
  return (
    <React.Fragment>
      <UploadFormWrapper>
        <h2>Upload an image for your friends to see</h2>
        <form>
          <input type="text" placeholder="Caption" />
          <input
            type="file"
            placeholder="Upload an image"
            onChange={uploadImage}
          />
          <input type="submit" value="Upload" />
        </form>
      </UploadFormWrapper>
    </React.Fragment>
  );
}

export default SignUp;
