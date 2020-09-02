import styled from "styled-components";

export const Input = styled.input`
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
`;

export const SubmitButton = styled(Input)`
  background-color: ${(props) =>
    props.disabled ? props.theme.lightBlue : props.theme.blue};
  color: ${(props) => props.theme.white};
  transition: all 0.2s ease-in;
  border: 1px solid
    ${(props) => (props.disabled ? props.theme.lightBlue : props.theme.blue)};
`;

export const Error = styled.p`
  color: ${(props) => props.theme.red};
  margin: 0 !important;
`;
