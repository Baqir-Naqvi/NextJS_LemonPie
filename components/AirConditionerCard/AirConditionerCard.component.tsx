import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "reactstrap"

const AirConditionerCard = () => (
  <Card body>
    <CardHeader>
      <FontAwesomeIcon icon={['far', "air-conditioner"]} />
    </CardHeader>
    <CardTitle tag="h3" className="mb-5 mx-auto">
      Condizionatore
    </CardTitle>
    <Link role="button" href="/condizionatore" className="btn">
      Vai
    </Link>
  </Card>
)

export default AirConditionerCard