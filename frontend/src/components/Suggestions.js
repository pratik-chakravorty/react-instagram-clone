import React from "react";
import avatar from "../static/default_avatar.jpg";
import styled from "styled-components";

const SuggestionWrapper = styled.div`
  margin-top: 6rem;
  width: 100%;
  img {
    width: 12%;
    height: 12%;
  }
  .suggestion-header {
    display: flex;
    margin: 0;
    .suggestion-text {
      margin-left: 10px;
    }
    h3 {
      margin: 0;
    }
    p {
      color: #262626;
      opacity: 0.4;
      margin: 0;
      font-size: 14px;
      position: relative;
      top: -10px;
    }
  }
  .suggestion-list {
    .suggestion-list-header {
      display: flex;
      .suggestion {
        margin-right: auto;
      }
    }
    ul {
      list-style-type: none;
    }
    li {
      display: flex;
      align-items: flex-start;
      padding-bottom: 5px;
      h3 {
        font-size: 15px;
      }
      .left-content {
        display: flex;
        img {
          width: 8%;
          height: 8%;
        }
      }
      .follow-text {
        margin-left: auto;
        color: ${(props) => props.theme.blue};
      }
    }
  }
`;
function Suggestions() {
  return (
    <SuggestionWrapper>
      <div className="suggestion-header">
        <img src={avatar} alt="profile-avatar" />
        <div className="suggestion-text">
          <h3>Username</h3>
          <p>Full Name</p>
        </div>
      </div>
      <div className="suggestion-list">
        <div className="suggestion-list-header">
          <p className="suggestion">Suggestions for you</p>
          <p>See All</p>
        </div>
        <ul>
          <li>
            <div className="left-content">
              <img src={avatar} alt="image avatar" />
              <h3>User 1</h3>
            </div>
            <div className="follow-text">
              <h3>Follow</h3>
            </div>
          </li>
          <li>
            <div className="left-content">
              <img src={avatar} alt="image avatar" />
              <h3>User 2</h3>
            </div>
            <div className="follow-text">
              <h3>Follow</h3>
            </div>
          </li>
          <li>
            <div className="left-content">
              <img src={avatar} alt="image avatar" />
              <h3>User 3</h3>
            </div>
            <div className="follow-text">
              <h3>Follow</h3>
            </div>
          </li>
        </ul>
      </div>
    </SuggestionWrapper>
  );
}

export default Suggestions;
