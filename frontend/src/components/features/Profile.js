import React from "react";
import styled from "styled-components";
import { PostIcon, SavedIcon, HeartIcon } from "./Icons";
import avatar from "../../static/default_avatar.jpg";
import post from "../../static/detailed_post.jpg";

const ProfileWrapper = styled.div`
  .profile-header {
    margin: 6rem auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 2rem;

    img {
      width: 30%;
      height: auto;
    }
    .profile-info {
      h2 {
        display: inline;
        margin-right: 20px;
      }
      ul {
        list-style-type: none;
      }
      li {
        display: inline;
        margin-right: 20px;
      }
    }
  }

  .posts-header {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid ${(props) => props.theme.borderColor};

    .tab {
      cursor: pointer;
      padding: 5px 30px;
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      border-bottom: 2px solid transparent;
    }

    .active {
      border-top: 2px solid "#000";
    }
  }

  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    column-gap: 20px;
    img {
      width: 90%;
      height: auto;
    }
  }
`;

const Button = styled.button`
  position: relative;
  top: -4px;
  background: ${(props) => props.theme.bg};
  padding: 5px 10px;
  font-weight: bold;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  outline: none;
`;
function Profile() {
  return (
    <ProfileWrapper>
      <div className="profile-header">
        <img src={avatar} alt="profile-avatar" />
        <div className="profile-info">
          <h2>Username</h2>
          <Button>Edit Profile</Button>
          <ul>
            <li>
              <strong>38</strong> Posts
            </li>
            <li>
              <strong>103</strong> Followers
            </li>
            <li>
              <strong>391</strong> Following
            </li>
          </ul>
          <div className="bio">
            <h4>
              <strong>Full Name</strong>
            </h4>
            <p>Bio of the user goes here...</p>
            <p>website</p>
          </div>
        </div>
      </div>
      <div className="posts-header">
        <div className="tab active">
          {" "}
          <PostIcon />
          Posts
        </div>
        <div className="tab active">
          {" "}
          <SavedIcon />
          Saved
        </div>
        <div className="tab active">
          <HeartIcon />
          Liked
        </div>
      </div>
      <div className="posts">
        <div className="img">
          <img src={post} alt="post-image" />
        </div>
        <div className="img">
          <img src={post} alt="post-image" />
        </div>
        <div className="img">
          <img src={post} alt="post-image" />
        </div>
        <div className="img">
          <img src={post} alt="post-image" />
        </div>
        <div className="img">
          <img src={post} alt="post-image" />
        </div>
        <div className="img">
          <img src={post} alt="post-image" />
        </div>
      </div>
    </ProfileWrapper>
  );
}

export default Profile;
