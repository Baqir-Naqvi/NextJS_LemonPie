export enum errorFormLabels {
  REQUIRED = "Campo obbligatorio",
  INVALID_EMAIL = "Email non valida!",
  INVALID_PHONE = "Numero di telefono non valido!",
  INVALID_ZIPCODE = "CAP non valido!",
  ADULT_REQUIRED = "Il sottoscrittore del contratto deve essere maggiorenne!",
  INVALID_CF = "Il codice fiscale inserito non è valido!",
  INVALID_VAT = "La partita iva inserita non è valida!",
  INVALID_CF_VAT = "Il codice fiscale o partita iva inserito non è valido!",
  INVALID_STRING_LENGTH = "Deve essere composto da 14 caratteri!",
  INVALID_IBAN = "Il codice IBAN inserito non è valido!",
  POSITIVE_NUMBER = "Il codice numero inserito deve essere positivo!",
  NOT_NULL = "Devi inserire un numero maggiore di 0",
  INTEGER_NUMBER = "Il numero deve essere un intero!",
  BAD_FORMAT = "Il formato dei dati non corrisponde a quello richiesto! (24-03-2001 o 2001-03-24)",
  NO_FUTURE_DATE = "La data non può essere futura e deve essere nel formato corretto: 24/03/1984 o 1984/03/24",
  NO_PAST_DATE = "La data non può essere passata e deve essere nel formato corretto: 24/03/1984 o 1984/03/24",
  CLIENT_CODE = "Il codice cliente deve iniziare con la lettera \"D\" o con la lettera \"B\", seguita da 6 numeri.",
}

export function maxLengthLabel(length: number) {
  if(length === 1) return "Il valore inserito deve essere composto da UN solo carattere"
  return `Il valore inserito non deve superare i ${length} caratteri di lunghezza`
}