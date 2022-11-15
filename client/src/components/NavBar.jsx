import hester from "../images/hester_sq.jpg";
import { Container, Image, Icon, Menu } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { logOut } from '../utilities/users-service';

function NavBar({ username, setUser }) {
  // const leftItems = [
  //   { as: "a", content: "Home", key: "home" },
  //   { as: "a", content: "Users", key: "users" }
  // ];
  // const rightItems = [
  //   { as: "a", content: "Login", key: "login" },
  //   { as: "a", content: "Register", key: "register" }
  // ];

  const navigate = useNavigate();

  return (
    <div className="nav-wrapper h-20">
      <Menu className="my-nav-bar" fixed="top" inverted>
        <Menu.Item>
          <Image className="nav-logo" bordered circular src={hester} />
        </Menu.Item>

        {/* {leftItems.map((item) => (
        <Menu.Item {...item} />
      ))} */}

        <Menu.Item as="a" content="Home" key="home-link" onClick={() => navigate('/main')} />
        <Menu.Item as="a" content="NASA" key="nasa-link" onClick={() => navigate('/nasa')} />
        <Menu.Item as="a" content="XL" key="xl-link1" onClick={() => navigate('/xl')} />
        <Menu.Item as="a" content="Eq Form" key="xl-link2" onClick={() => navigate('/equipment')} />
        <Menu.Item as="a" content="Eq Table" key="xl-link3" onClick={() => navigate('/equipment/all')} />

        <Menu.Menu position="right">
        <Menu.Item as="a" content="Logoff" key="home-link" onClick={() => {
          logOut();
          setUser(null);
          navigate('/');
        }} />
        <Menu.Item as="span" className="!text-orange-500" content={username} key="username-link" />
          {/* {rightItems.map((item) => (
            <Menu.Item {...item} />
          ))} */}
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export default NavBar