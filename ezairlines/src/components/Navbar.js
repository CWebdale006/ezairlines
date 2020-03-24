import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import { Navbar, Nav, Form } from 'react-bootstrap';
import "../css/navbar.css";

const MyNavbar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    // idk what this does so its getting commented out 
    let addClass = (e) => {
        // const link = e.target;
        // console.log(link);
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">EZAirlines</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" defaultactivekey="/">
                    <Nav.Item>
                        <Link to="/" className="nav-link" id="navEffect" onClick={addClass}>Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/update-user" className="nav-link" id="navEffect" onClick={addClass}>Update user</Link>
                    </Nav.Item>
                    <Nav.Item>
                        {isAuthenticated && <Link to="/external-api" className="nav-link" id="navEffect" onClick={addClass}>External API</Link>}
                    </Nav.Item>
                </Nav>
                <Form inline>
                    {/**idk why this is in a div */}
                    <div>
                        {!isAuthenticated && (
                            <button type="button" className="btn btn-primary" onClick={() => loginWithRedirect({})}>Log in</button>
                        )}

                        {isAuthenticated && (
                            <>
                                <Link id="link" to="/profile"><button type="button" className="btn btn-primary">Profile</button></Link>
                                <button type="button" className="btn btn-primary" onClick={() => logout()}>Log out</button>
                            </>
                        )}
                    </div>
                </Form>
            </Navbar.Collapse>
        </Navbar>

        /**
         * THIS WORKS, DO NOT DELETE
         */
        // <div>
        //     {!isAuthenticated && (
        //         <button onClick={() => loginWithRedirect({})}>Log in</button>
        //     )}

        //     {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

        //     {isAuthenticated && (
        //         <span>
        //             <Link to="/">Home</Link>&nbsp;
        //             <Link to="/profile">Profile</Link>
        //             <Link to="/external-api">External API</Link>
        //             <Link to="/update-user">Update</Link>
        //         </span>
        //     )}
        // </div>
    );
};

export default MyNavbar;