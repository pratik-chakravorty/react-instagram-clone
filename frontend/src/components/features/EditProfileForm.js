import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Error, Input, SubmitButton } from "../../styles/CommonStyles";
import { updateUser } from "../../actions/userActions";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const schema = yup.object().shape({
  username: yup.string().required(),
  bio: yup.string().required(),
  website: yup.string().required(),
  files: yup
    .mixed()
    .required("A file is required")
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value[0].type)
    ),
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
  const alerts = useSelector((state) => state.alerts);
  const [imageUrl, setImageUrl] = useState("");
  const [formEnable, setFormEnable] = useState(true);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "instagram_clone_pc");
    const res = await fetch(
      "https:///api.cloudinary.com/v1_1/pratik071253/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    if (file.secure_url) {
      setImageUrl(file.secure_url);
      setFormEnable((preValue) => !preValue);
    }
  };
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(updateUser({ ...values, avatar: imageUrl }));
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
          type="file"
          ref={register}
          name="files"
          placeholder="Upload an image"
          onChange={uploadImage}
        />
        {errors.files && <Error>{errors.files.message}</Error>}
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
        <SubmitButton
          type="submit"
          value="Edit Profile"
          disabled={formEnable}
        />
      </form>
    </EditProfileWrapper>
  );
}

export default EditProfileForm;
