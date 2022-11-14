import hester from "../images/hester_sq.jpg";
import { Container, Image, Icon, Menu } from 'semantic-ui-react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/navbar.css';
function NavBar({ leftItems, rightItems }) {
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
    <Menu className="my-nav-bar" fixed="top" inverted>
      <Menu.Item>
        <Image className="nav-logo" bordered circular src={hester} />
      </Menu.Item>

      {/* {leftItems.map((item) => (
        <Menu.Item {...item} />
      ))} */}

      <Menu.Item as="a" content="Home" key="home-link" onClick={() => navigate('/main')} />
      <Menu.Item as="a" content="NASA" key="nasa-link" onClick={() => navigate('/nasa')} />
      <Menu.Item as="a" content="XL" key="xl-link" onClick={() => navigate('/xl')} />
      <Menu.Item as="a" content="equipment" key="xl-link" onClick={() => navigate('/equipment')} />

      <Menu.Menu position="right">
        {rightItems.map((item) => (
          <Menu.Item {...item} />
        ))}
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar