import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Error, Input, SubmitButton } from "../../styles/CommonStyles";
import { updateUser } from "../../actions/userActions";

const schema = yup.object().shape({
  username: yup.string().required(),
  bio: yup.string().required(),
  website: yup.string().required(),
});

const EditProfileWrapper = styled.div`
  max-width: 550px;
  background-color: ${(props) => props.theme.white};
  text-align: center;
  margin: 4rem auto 0.3rem auto;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

function EditProfileForm() {
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(updateUser(values));
  };
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: user.username,
      bio: user.bio,
      website: user.website,
      fullname: user.fullname,
    },
  });
  return (
    <EditProfileWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          ref={register}
          name="username"
          placeholder="Username"
        />

        {errors.username && <Error>{errors.username.message}</Error>}

        <Input
          type="text"
          ref={register}
          name="fullname"
          placeholder="fullname"
        />

        {errors.fullname && <Error>{errors.fullname.message}</Error>}

        <Input type="text" ref={register} name="bio" placeholder="Bio" />
        {errors.bio && <Error>{errors.bio.message}</Error>}
        <Input
          type="website"
          ref={register}
          name="website"
          placeholder="Website"
        />
        {errors.website && <Error>{errors.website.message}</Error>}
        <SubmitButton type="submit" value="Edit Profile" />
      </form>
    </EditProfileWrapper>
  );
}

export default EditProfileForm;
