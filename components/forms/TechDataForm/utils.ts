export function setDefaultFormData(techData?: any) {
  return techData ? ({
    ...techData,
    splitArea: techData.splitArea || null,
    cadastralDataFloor: techData.cadastralDataFloor || null,
    cadastralDataNumber: techData.cadastralDataNumber || null,
    usabelArea: techData.usabelArea || null,
    realEstateUnits: techData.realEstateUnits || null,
    deductionRealEstateUnits: techData.deductionRealEstateUnits || null,
  }) : ({
    splitArea: null,
    cadastralDataFloor: null,
    cadastralDataNumber: null,
    usabelArea: null,
    realEstateUnits: null,
    deductionRealEstateUnits: null,
  })
}