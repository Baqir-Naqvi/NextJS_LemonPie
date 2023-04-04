import { useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ConfirmationFormStyle from "./style"
import ButtonWithLoader from "../../ButtonWithLoader/ButtonWithLoader.component"
import CanI from "../../auth/CanI.component"
import ScrollToTop from "../../ScrollToTop/ScrollToTop.component"
import { useContractFinalizationMutation } from "../../../redux/contract/contract.api"
import { 
  useSelectContractId, useSelectContractIsFinalized, 
  useSelectEntityName, useSetIsContractFinalized,
} from "../../../providers/ContractsFormPageProvider.providers"
import { selectContractCustomerData } from "../../../redux/contract/contract.selectors"
import { useAppSelector } from "../../../redux/hooks"

const ConfirmationForm = () => {
  const isContractFinalized = useSelectContractIsFinalized()
  const setIsContractFinalized = useSetIsContractFinalized()
  const entityName = useSelectEntityName()
  const contractId = useSelectContractId()
  //Select contract data with permissions
  const selectCustomerData = useMemo(() => selectContractCustomerData({ entityName, contractId }), [entityName, contractId])
  const { data: customerData } = useAppSelector(selectCustomerData)
  const [commitFinalization, { isLoading }] = useContractFinalizationMutation()

  const contractFinalization = (action: string) => {
    commitFinalization(action)
      .unwrap()
      .then(() => {
        setIsContractFinalized(true)
      })
      .catch((error: any) => console.error('rejected', error))
  }

  return (
    <ConfirmationFormStyle>
      <ScrollToTop />
      {isContractFinalized ? (
        <>
          <header>
            <FontAwesomeIcon icon={['far', 'champagne-glasses']} />
            <h1>Grazie per aver scelto Comfort Home Solutions</h1>
          </header>
          <main>
            Stiamo già lavorando per soddisfare la tua richiesta!
            <br />
            <br />
            A breve riceverai una mail di conferma e verrai quindi contattato da un nostro incaricato 
            per definire alcuni dettagli, prima che i nostri tecnici entrino in azione!
            <br />
            <br />
            Grazie ancora per averci scelto 💚, 
            <br />
            Comfort Home Solutions
          </main>
        </>
      ) : (
        <>
          <header>
            <FontAwesomeIcon icon={['far', 'flag-checkered']} />
            <h1>Rivedi e conferma</h1>
          </header>
          <main>
            <p>
              Ce l&apos;hai fatta!
              <br />
              Se vuoi puoi rivedere o modificare i tuoi dati e,   
              quando pensi che sia tutto a posto, concludi usando 
              il tasto &quot;Conferma&quot; qui sotto!
            </p>
            <CanI doWhat="CREATE" withPermissions={customerData.links} entityName={`${entityName}Commit`}>
              {({ action }) => (
                <div className="d-flex justify-content-end mt-5">
                  <ButtonWithLoader 
                    label="Conferma"
                    isLoading={isLoading}
                    color="info"
                    size="lg"
                    onClick={() => contractFinalization(action)}
                    disabled={isLoading}
                  />
                </div>
              )}
            </CanI>
          </main>
        </>
      )}
    </ConfirmationFormStyle>
  )
}

export default ConfirmationForm