import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { Error, Input, SubmitButton } from "../../styles/CommonStyles";
import { addPost as addPostAction } from "../../actions/postActions";
import styled from "styled-components";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const schema = yup.object().shape({
  caption: yup.string().required(),
  files: yup
    .mixed()
    .required("A file is required")
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value[0].type)
    ),
});

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
    line-height: 1.5;
    margin-bottom: 10px;
    text-align: center;
  }
  input[type="file"] {
    background: transparent;
    font-size: 13px;
  }

  p {
    margin-top: 2rem;
  }
`;

function UploadForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formEnable, setFormEnable] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

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

  const onSubmit = (values) => {
    let formData = { ...values, files: imageUrl };
    dispatch(addPostAction(formData));
    history.push("/feed");
  };

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  return (
    <React.Fragment>
      <UploadFormWrapper>
        <h2>
          Upload an image for your <br />
          friends to see
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            ref={register}
            name="caption"
            placeholder="Caption"
          />
          {errors.caption && <Error>{errors.caption.message}</Error>}
          <Input
            type="file"
            ref={register}
            name="files"
            placeholder="Upload an image"
            onChange={uploadImage}
          />
          {errors.files && <Error>{errors.files.message}</Error>}
          <SubmitButton disabled={formEnable} type="submit" value="Upload" />
        </form>
      </UploadFormWrapper>
    </React.Fragment>
  );
}

export default UploadForm;
