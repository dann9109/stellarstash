import { Container, Row, Col } from "react-bootstrap";


const Footer = () => {  // Footer component
    const currentYear = new Date().getFullYear();  // Get current year
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3"> {/* Centered text */}
                        <p>StellarStash &copy; {currentYear} StellarStash</p> {/* Footer text */}
                        <p className="text-center py-3">&copy; 2024 StellarStash</p> {/* Footer text */}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;  // Export Footer component