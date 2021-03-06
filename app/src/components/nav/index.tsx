/*
  Parent navigation container
 */

import * as React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Account from "../userProfile";
import Menu from "./menu";

export default class NavMenu extends React.Component<any, any> {
  public render() {
    return (
      <Navbar
        inverse
        fixedTop
        fluid
        collapseOnSelect
        style={{ zIndex: 1000 as any }}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={"/"}>PGH Supply</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Menu />
          <Account />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
