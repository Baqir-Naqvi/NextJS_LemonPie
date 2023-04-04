export function isTabDisabled(tabNumber: number, formStep: number) {
  if(tabNumber > formStep) return true
  return false
}