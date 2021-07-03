import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import LoggedInNav from "./LoggedInNav";
import classes from "./NavBar.module.css";
import Web3 from "web3";



export default function NavBar() {
  
    const [ac, setAC] = useState(null)

    useEffect(() => {
      window.onload = async function () {
        let web3 = new Web3(Web3.givenProvider)
        let data = await web3.eth.getAccounts()
        setAC(data[0])
     } 
    })

    return (
      <div className={classes.Container}>
        <div className="container">
          <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="#home" className="text-dark">
              <strong>Smartix</strong>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#features" className="text-dark">
                  How It Works
                </Nav.Link>
              </Nav>
              <Nav>{ac ? <LoggedInNav /> : null}</Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
}
