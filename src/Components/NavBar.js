import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  
  return (
    <div>
      <Navbar className="nav-custom-color" expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          
        <Nav className="mr-auto" navbar>
          <NavItem>
              <NavLink href="/components/">Home</NavLink>
          </NavItem>
        {localStorage.getItem("@TOKEN")==="ROLE_COORDENADOR" &&(
          <>
            <NavItem>
              <NavLink href="/matriz/">Matriz</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </>

           )}    
        </Nav>
      </Collapse>
    </Navbar>
  </div>
  );
}

export default NavBar;