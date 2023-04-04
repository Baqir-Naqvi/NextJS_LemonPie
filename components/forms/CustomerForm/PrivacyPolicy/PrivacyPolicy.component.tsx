import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "reactstrap"

import RadioWrapper from "../../inputFields/Radio/RadioWrapper.component"
import { errorFormLabels } from "../../utils/formLabels"
import PrivacyPolicyModal from "./PrivacyPolicyModal.component"

const PrivacyPolicy = () => {
  const { register, watch, formState: { errors } } = useFormContext()
  const formWatcher = watch()

  const [visibility, setVisibility] = useState(false)
  const toggle = () => setVisibility(prevState => !prevState)

  return (
    <div className="grouped">
      <div className="grouped-header">
        <FontAwesomeIcon icon={["far", 'bullhorn']} className="me-2" />
        Consensi
      </div>
      <div className="grouped-body privacy">
        <div className="mb-3">
          Dichiaro di aver preso visione dell&apos; 
          <Button color="link" className="link-button" onClick={toggle} size="sm">
            informativa sulla privacy
          </Button>.
          <PrivacyPolicyModal 
            isOpen={visibility}
            toggle={toggle}
          />
        </div>
        <div className="mb-3">
          <p className="mb-2">
            Inoltre,  in  merito  al  trattamento  dei  miei  dati  personali  per  l’invio  di  comunicazioni  
            commerciali  direttamente  da  parte di Covercare  (marketing diretto)
          </p>
          <RadioWrapper
            id="directMarketingTrue"
            name="directMarketing"
            label="Presto il consenso"
            className="form-check-input"
            register={register}
            errors={errors}
            value={true}
            defaultChecked={formWatcher.directMarketing === true}
            rules={{ required: errorFormLabels.REQUIRED }}
          />
          <RadioWrapper 
            id="directMarketingFalse"
            name="directMarketing"
            label="Nego il consenso"
            register={register}
            errors={errors}
            className="form-check-input"
            value={false}
            rules={{ required: errorFormLabels.REQUIRED }}
            defaultChecked={formWatcher.directMarketing === false}
          />
        </div>
        <div className="mb-3">
          <p className="mb-2">
            Inoltre,  in  merito  al  trattamento  dei  miei  dati  personali  per  l’invio  di  comunicazioni 
            commerciali da parte di società partner di Covercare (marketing indiretto)
          </p>
          <RadioWrapper 
            id="idirectMarketingTrue"
            name="indirectMarketing"
            label="Presto il consenso"
            className="form-check-input"
            register={register}
            errors={errors}
            value={true}
            defaultChecked={formWatcher.indirectMarketing === true}
            rules={{ required: errorFormLabels.REQUIRED }}
          />
          <RadioWrapper 
            id="idirectMarketingFalse"
            name="indirectMarketing"
            label="Nego il consenso"
            register={register}
            className="form-check-input"
            errors={errors}
            value={false}
            defaultChecked={formWatcher.indirectMarketing === false}
            rules={{ required: errorFormLabels.REQUIRED }}
          />
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy