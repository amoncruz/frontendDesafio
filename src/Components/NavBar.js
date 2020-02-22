import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let history = useHistory();

  const handleLogout=()=>{
    localStorage.clear();
    history.push("/");
  }

  return (
    <div>
      <Navbar className="nav-custom-color" expand="md">	
        <NavbarBrand href="/">reactstrap</NavbarBrand>	
        <NavbarToggler onClick={toggle} />	
        <Collapse isOpen={isOpen} navbar>	

        <Nav className="mr-auto" navbar>	
          <NavItem>	
              <NavLink href="/pagina_inicial">Home</NavLink>	
          </NavItem>	
        {localStorage.getItem("@TOKEN")!=="ROLE_USER" &&(	
          <>	
            <NavItem>	
              <NavLink href="/aluno">Cursos</NavLink>	
            </NavItem>	

          </>	

           )}    	
        </Nav>
        <div onClick={handleLogout} className="icon-sign-out">
          <FontAwesomeIcon icon={faSignOutAlt}/>
        </div>	
      </Collapse>	
    </Navbar>
  </div>
  );
}

export default NavBar;