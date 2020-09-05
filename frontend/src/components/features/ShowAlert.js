import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Alert = styled.div`
  color: ${(props) =>
    props.status === "success" ? props.theme.darkGreen : props.theme.white};
  background-color: ${(props) =>
    props.status === "success" ? props.theme.green : props.theme.red};
  padding: 2rem 2rem;
  text-align: center;
  position: relative;
  top: 0;
  z-index: 999;
  transition: all 0.2s ease-out;
`;
const ShowAlert = ({ alertType, id, msg }) => {
  return (
    <Alert status={alertType} key={id}>
      {msg}
    </Alert>
  );
};

ShowAlert.propTypes = {
  alertType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

export default ShowAlert;
