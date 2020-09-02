import React from "react";
import styled from "styled-components";

const InputWrapper = styled.input`
  padding: 0.4rem 0.6rem;
  background: ${(props) => props.theme.bg};
  border: 1px solid ${(props) => props.theme.borderColor};
  font-family: "Fira Sans", sans-serif;
  font-size: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  ::placeholder,
  ::-webkit-input-placeholder {
    text-align: center;
    font-size: 14px;
    font-weight: 100;
  }
  :-ms-input-placeholder {
    text-align: center;
  }
`;

function Search() {
  return <InputWrapper type="text" placeholder="Search" />;
}

export default Search;
