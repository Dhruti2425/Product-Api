import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

    let data = useSelector(state => state.count)
    console.log(data);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Product App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home"><Link to={'/'} className='text-decoration-none text-secondary'>Home</Link></Nav.Link>
                    </Nav>
                    <Link to={'/cart'} ><Button variant="success" className='px-4'>Cart ( {data} )</Button></Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;