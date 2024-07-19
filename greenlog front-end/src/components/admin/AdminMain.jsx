import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AdminRouter from '../../routers/AdminRouter';
import { Row, Col } from 'react-bootstrap';

const AdminMain = () => {
    return (
        <Row>
            <Col xs={2}>
                <Navbar bg="light" className="flex-column" style={{ height: '100vh', position: 'fixed' }}>
                    <Container className="flex-column" style={{ alignItems: 'flex-start' }}>
                        <Nav className="flex-column">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </Col>
            <Col xs={10}>
                <AdminRouter />
            </Col>
        </Row>
    )
}

export default AdminMain