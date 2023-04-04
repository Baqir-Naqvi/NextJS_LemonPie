import { Col, Container, Row } from "reactstrap"
import FooterStyle from "./style"

const Footer = () => {
  return (
    <FooterStyle>
      <Container>
        <Row>
          <Col md={6}>
            <p>Capitale Sociale: Euro 100.000</p>
            <p>Codice Fiscale, Partita I.V.A. e Iscrizione al Registro delle Imprese di Milano: N° 02427340183</p>
            <p>R.E.A. di Milano: 1995374</p>
          </Col>
          <Col
            md={{
              offset: 2,
              size: 4
            }}
          >
            <p>
              Informativa
            </p>
            <p>
              Cookie Policy
            </p>
            <p>
              Modello 231
            </p>
          </Col>
        </Row>
      </Container>
    </FooterStyle>
  )
}

export default Footer