import moment from "moment"
import { isValidIBAN } from 'ibantools'

import { errorFormLabels } from "./formLabels"

export function required<Type>(value: Type) {
  if(typeof value === 'string') {
    return value?.length && value.trim().length ? undefined : errorFormLabels['REQUIRED']
  }
  return value ? undefined : errorFormLabels['REQUIRED']
}

export const emailCheck = (value: string) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return  value ? re.test(String(value)) : true
}

export const euPhoneCheck = (value: string) => {
	const re = /([^\d+]|^|>)((((\+|00)(\d\d)\s*(\(0\))?)|0)?(\s*\d){7,10})([^\d+]|$|<)$/
  return value ? re.test(String(value).toLowerCase()) : true
}

export const codiceFISCALE = (cfins: string) =>	{
	var cf = cfins.toUpperCase();
	var cfReg = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
	if (!cfReg.test(cf))
	{
		return false;
	}

	var set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX";
	var s = 0;
	for( var i = 1; i <= 13; i += 2 )
	  s += setpari.indexOf( set2.charAt( set1.indexOf( cf.charAt(i) )));
	for( var j = 0; j <= 14; j += 2 )
	  s += setdisp.indexOf( set2.charAt( set1.indexOf( cf.charAt(j) )));
	if ( s%26 !== cf.charCodeAt(15)-'A'.charCodeAt(0) )
	  return false;
	return true;
}

export const vatNumberRegExpCheck = (value: string) => {
  const re = /^[0-9]{11}$/
  return re.test(String(value).toLowerCase())
}

export const mustBeAdult = (value: string | Date) => {
	const inputValue = moment(value).format('YYYY-MM-DD')	
	return moment().diff(inputValue, 'years') >= 18
}

export const isValidIban = (value: string) => {
  const re = /^IT[a-zA-Z0-9]*$/
  return re.test(String(value.split(' ').join('').toUpperCase())) && isValidIBAN(value)
}