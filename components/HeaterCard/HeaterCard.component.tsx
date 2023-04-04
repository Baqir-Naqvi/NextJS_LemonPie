import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "reactstrap"

const HeaterCard = () => (
  <Card body>
    <CardHeader>
      <FontAwesomeIcon icon={['far', "heat"]} />
    </CardHeader>
    <CardTitle tag="h3" className="mb-5 mx-auto">
      Caldaia
    </CardTitle>
    <Link role="button" href="/caldaia" className="btn">
      Vai
    </Link>
  </Card>
)

export default HeaterCard