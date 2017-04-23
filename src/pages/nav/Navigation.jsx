import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
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
				</Nav>
			</Navbar.Collapse>	
		</Navbar>
	);
};

export default Navigation;
