import { IconProp } from "@fortawesome/fontawesome-svg-core"

import { ContractTabsMap } from "../../redux/contract/contract.utils"
import { FormHeader } from "../forms/utils/types"

export function getFormHeaderIcon(entityName: string): IconProp {
  return entityName === "heater" ? ['far', 'heat'] : ['far', 'air-conditioner']
}

export function getFormStepHeader(formStep: ContractTabsMap): FormHeader {
  switch(formStep) {
    case ContractTabsMap.SIGNATURE_STEP:
      return {
        title: "Conferma",
        description: "Conferma la bontà dei dati inseriti e finalizza la tua richiesta.",
      }

    case ContractTabsMap.ATTACHMENTS_STEP:
      return {
        title: "Documenti",
        description: "Carica la tua carta d'identità (fronte e retro in due file separati), insieme alla tua tessera sanitaria (fronte e retro in due file separati). Puoi caricare eventuali altri allegati che ritieni possano essere utili, in questo caso ti consigliamo di spiegarci la finalità di utilizzo nel campo descrizione.",
      }

    case ContractTabsMap.TECHNICAL_DATA_STEP:
      return {
        title: "Dati tecnici",
        description: "Inserisci i dati che saranno utili ai nostri tenici per comprendere le tue esigenze e fornirti una soluzione personalizzata.",
      }

    case ContractTabsMap.BANK_ACCOUNT_STEP:
      return {
        title: "Dati pagamento",
        description: "Scegli il metodo di pagamento che preferisci: puoi pagare comodamente con bonifico bancario, oppure sfruttare un finanziamento.",
      }

    default:
      return {
        title: "Dati cliente",
        description: "In questa sezione dovrai inserire i tuoi dati personali, confermare di aver letto e compreso i termini e le condizioni contrattuali, oltre a fornire il tuo consenso/dissenso all'utilizzo dei tuoi dati personali con finalità di marketing diretto e indiretto.",
      }
  }
}