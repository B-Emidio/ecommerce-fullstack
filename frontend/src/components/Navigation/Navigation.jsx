import { Container, Nav, Navbar } from "react-bootstrap";
import "./Navigation.css";
import { useLocation } from "react-router-dom";

const Navigation = () => {

  const location = useLocation();

  return (
    <Navbar fixed="top" bg="primary" data-bs-theme="dark">
      <Container>
        <Nav
          activeKey={location.pathname}>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/listagem">Listagem</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/compra/novo">Registrar Compra</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/compra">Compras</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>

  );
};

export default Navigation;