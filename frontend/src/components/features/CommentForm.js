import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addComment as addCommentAction } from "../../actions/postActions";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const CommentFormWrapper = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem 1rem;

  input {
    border: none;
    width: 100%;
    height: 100%;
  }
`;

const CommentButton = styled.input`
  color: ${(props) =>
    props.disabled ? props.theme.lightBlue : props.theme.blue};
  border: 0;
  transition: all 0.2s ease-out;
  padding: 0;
  flex: 0;
  background: none;
  font-size: 0.9rem;
`;

function CommentForm({ postId }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    let finalData = { id: postId, ...formData };
    dispatch(addCommentAction(finalData));
    reset();
  };
  return (
    <CommentFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={register({ required: true })}
        name="text"
        type="text"
        placeholder="Add a Comment..."
      />
      <CommentButton type="submit" disabled={!formState.isValid} value="Post" />
    </CommentFormWrapper>
  );
}

CommentForm.prototypes = {
  postId: PropTypes.string.isRequired,
};
export default CommentForm;
