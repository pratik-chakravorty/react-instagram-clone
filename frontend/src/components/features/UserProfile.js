import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostIcon, SavedIcon, HeartIcon } from "./Icons";
import { fetchUser } from "../../actions/userActions";
import PostGrid from "./PostGrid";

const ProfileWrapper = styled.div`
  .profile-header {
    margin: 6rem auto;
    display: flex;
    align-items: flex-start;
    padding: 2rem;

    img {
      width: 200px;
      height: 200px;
      margin-right: 8rem;
      border-radius: 50%;
      object-fit: cover;
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
function UserProfile({ match }) {
  const userName = match.params.userName;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(userName));
  }, []);
  const { user } = useSelector((state) => state.user);
  return (
    <ProfileWrapper>
      <div className="profile-header">
        <img src={user.avatar} alt="profile-avatar" />
        <div className="profile-info">
          <h2>{user.username}</h2>
          <Button as={Link} to="/editProfile">
            Edit Profile
          </Button>
          <ul>
            <li>
              <strong>{user.postCount}</strong> Posts
            </li>
            <li>
              <strong>{user.followersCount}</strong> Followers
            </li>
            <li>
              <strong>{user.followingCount}</strong> Following
            </li>
          </ul>
          <div className="bio">
            <h4>
              <strong>{user.fullname}</strong>
            </h4>
            <p>{user.bio ? user.bio : "Add a bio by editing your profile."}</p>
            <p>
              {user.website
                ? user.website
                : "Add a website by editing your profile."}
            </p>
          </div>
        </div>
      </div>
      {/* Nested Routes should go here... */}
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
      {user?.posts && <PostGrid posts={user.posts} />}
    </ProfileWrapper>
  );
}

export default UserProfile;
