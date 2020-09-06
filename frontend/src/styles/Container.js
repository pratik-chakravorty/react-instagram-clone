import styled from "styled-components";

const Container = styled.div`
  max-width: ${(props) => (props.width ? props.width : "960px")};
  margin: 0 auto;
`;

export default Container;
