import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logOut } from '../utilities/users-service';
// import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useState } from 'react';


function NavBarRTT({ user, googleUser, handleSignOut, setUser }) {


  const [userObj, setUserObj] = useState(null);

  // decode the user jwt to display the user name.
  // this could have been stored in localStorage instead.
  useEffect(() => {
    if (user) {
      // alert(JSON.stringify(user))
      // console.logs in useEffect[] only appear for a split second
      setUserObj(user);
    }

  }, []);

  function handleLogOut() {
    // Delegate to the users-service
    logOut();
    setUser(null);
  }

  return (
    <Navbar className="nav-bar navbar-expand-sm" bg="light" expand="lg">
      <Container className="nav-container">
        <Navbar.Brand as={Link} to="/">
          RT<span style={{ color: 'deeppink' }}>TShirts</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {Object.keys(googleUser).length !== 0 || user &&
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="products">Products</Nav.Link>
                <Nav.Link as={Link} to="cart">Cart</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>

        <div className="nav-login">

          {Object.keys(googleUser).length !== 0 ?
            <>
              <div google-nav-unit>
                <img className="g-profile-img" src={googleUser.picture} alt="" referrerPolicy="no-referrer" />
                <h3 className="g-name">hi, {googleUser.given_name}!</h3>
              </div>
              <button className="g-signout" onClick={(e) => handleSignOut(e)}>logoff</button>
            </>
            :
            user &&
            <>
              <div className="user-logout-unit">
                <div
                  style={{ width: "100px", wordWrap: 'break-word' }}>
                  hi, {user && JSON.parse(localStorage.getItem("data")).user.name}
                </div>
                <button
                  className="u-signout"
                  onClick={(e) => handleLogOut()}>
                  sign out
                </button>
              </div>
            </>
          }

        </div>
      </Container>
    </Navbar>
  )
}

export default NavBarRTT