import React from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import Search from "../features/Search";
import {
  HomeIcon,
  ExploreIcon,
  HeartIcon,
  NewPostIcon,
} from "../features/Icons";
import navLogo from "../../static/navlogo.png";

const NavWrapper = styled.div`
  width: 100%;
  height: 54px;
  position: fixed;
  background: ${(props) => props.theme.white};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  nav {
    display: flex;
    margin-top: 10px;
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

function Nav() {
  return (
    <NavWrapper>
      <Container>
        <nav>
          <img className="nav-logo" src={navLogo} alt="nav logo" />
          <Search />
          <ul>
            <li>
              <a>
                <HomeIcon />
              </a>
            </li>
            <li>
              <a>
                <NewPostIcon />
              </a>
            </li>
            <li>
              <a>
                <ExploreIcon />
              </a>
            </li>
            <li>
              <a>
                <HeartIcon />
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </NavWrapper>
  );
}

export default Nav;
