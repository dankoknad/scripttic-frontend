import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Navigation = ({loggedUser, token}) => {
	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Toggle />
				{(loggedUser.firstName && token.length === 36) && 
					<LinkContainer to="/profile" exact activeClassName="active">
							<NavItem eventKey={2} href="#">
						<Navbar.Brand>
								Hello {loggedUser.firstName}
						</Navbar.Brand>
								</NavItem>
					</LinkContainer>
				}
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav pullRight>
					<LinkContainer to="/" exact activeClassName="active">
						<NavItem eventKey={2} href="#">Articles</NavItem>
					</LinkContainer>
					{(token.length !== 36)
						?	<LinkContainer to="/login" activeClassName="active">
								<NavItem eventKey={2} href="#">Log in</NavItem>
							</LinkContainer>
						:	<LinkContainer to="/logout" activeClassName="active">
								<NavItem eventKey={2} href="#">Log out</NavItem>
							</LinkContainer>
					}
					<NavDropdown eventKey={3} title="Dropdown to nowhere" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Action</MenuItem>
						<MenuItem eventKey={3.2}>Another action</MenuItem>
						<MenuItem eventKey={3.3}>Something else here</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.4}>Separated link</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>	
		</Navbar>
	);
};

export default Navigation;
