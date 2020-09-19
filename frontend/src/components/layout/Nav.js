import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { usePrevious } from "../../hooks";
import Container from "../../styles/Container";
import Search from "../features/Search";
import {
  HomeIcon,
  HomeIconFilled,
  ExploreIcon,
  HeartIcon,
  NewPostIcon,
  ProfileIcon,
  ProfileSavedIcon,
} from "../features/Icons";
import { logout } from "../../actions/authActions";
import navLogo from "../../static/navlogo.png";

const NavWrapper = styled.div`
  width: 100%;
  height: 54px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: ${(props) => props.theme.white};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  nav {
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    position: relative;
    top: 2px;
  }

  ul {
    display: flex;
    position: relative;
    top: 3px;
    list-style-type: none;
  }

  li {
    display: inline;
    margin-left: 2rem;
  }
`;

const ProfileLink = styled.a`
  color: #000;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  margin-left: 5px;
  span {
    margin-left: 5px;
  }
`;
function Nav({ user }) {
  const [current, setCurrent] = useState("home-feed");
  const prevCurrent = usePrevious(current);
  const dispatch = useDispatch();
  const history = useHistory();
  const popupRef = React.useRef();
  const handleProfileClick = () => {
    popupRef.current.close();
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <NavWrapper>
      <Container>
        <nav>
          <img className="nav-logo" src={navLogo} alt="nav logo" />
          <Search />
          <ul>
            <li>
              <Link to="/feed" onClick={() => setCurrent("home-feed")}>
                {current === "home-feed" ? <HomeIconFilled /> : <HomeIcon />}
              </Link>
            </li>
            <li>
              <Link to="/new" onClick={() => setCurrent("")}>
                <NewPostIcon />
              </Link>
            </li>
            <li>
              <a>
                <ExploreIcon onClick={() => setCurrent("")} />
              </a>
            </li>
            <li>
              <a>
                <HeartIcon onClick={() => setCurrent("")} />
              </a>
            </li>
            <li>
              <Popup
                closeOnDocumentClick
                ref={popupRef}
                trigger={
                  <img
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    src={user?.avatar}
                    alt="avatar"
                  />
                }
              >
                {" "}
                <ProfileLink
                  as={Link}
                  onClick={handleProfileClick}
                  to={`/${user?.username}`}
                >
                  <ProfileIcon />
                  <span>Profile</span>
                </ProfileLink>
                <ProfileLink as={Link} onClick={handleLogout}>
                  <span>Logout</span>
                </ProfileLink>
              </Popup>
            </li>
          </ul>
        </nav>
      </Container>
    </NavWrapper>
  );
}

export default Nav;
