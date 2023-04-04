import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import FinalStepStyle from "./style"

const FinalStep = () => {
  return (
    <FinalStepStyle>
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
    </FinalStepStyle>
  )
}

export default FinalStep