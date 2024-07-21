import { motion } from "framer-motion";
import { useMatch, PathMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const popularMatch: PathMatch<string> | null = useMatch("/");
  const comingSoonMatch: PathMatch<string> | null = useMatch("/coming-soon");
  const nowPlayingMatch: PathMatch<string> | null = useMatch("/now-playing");

  return (
    <>
      <Nav>
        <NavUl>
          <NavLi>
            <NavLink to="/">
              POPULAR {popularMatch && <Circle layoutId="circle" />}
            </NavLink>
          </NavLi>
          <NavLi>
            <NavLink to="/coming-soon">
              COMING SOON {comingSoonMatch && <Circle layoutId="circle" />}
            </NavLink>
          </NavLi>
          <NavLi>
            <NavLink to="/now-playing">
              NOW PLAYING {nowPlayingMatch && <Circle layoutId="circle" />}
            </NavLink>
          </NavLi>
        </NavUl>
      </Nav>
    </>
  );
};

export default Header;

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: ${(props) => props.theme.black.lighter};
`;

const NavUl = styled.ul`
  height: 100%;
  display: flex;
  gap: 20px;
`;

const NavLi = styled.li``;

const NavLink = styled(Link)`
  height: 100%;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: 0px;
  width: 5px;
  height: 5px;
  background-color: ${(props) => props.theme.red};
  border-radius: 50%;
`;
