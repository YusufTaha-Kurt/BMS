import type { LocalizedText } from '../site.ts'

export type PilotFieldId = 'startDate' | 'groupSize' | 'dataCoverage' | 'validationResults'
export type CarbonFieldId = 'measurementPoint' | 'measurementPeriod' | 'gridEnergy' | 'factorValue' | 'factorYear' | 'connectionType' | 'factorSource' | 'operationalEmissions' | 'measuredReduction' | 'supplierDocuments'

/** Populate only with supplied pilot information. Relative proposal periods are in the copy. */
export const PILOT_INFORMATION: Record<PilotFieldId, LocalizedText> = {
  startDate: {}, groupSize: {}, dataCoverage: {}, validationResults: {},
}

/** No demo factors or simulated results belong in these actual pilot fields. */
export const CARBON_INFORMATION: Record<CarbonFieldId, LocalizedText> = {
  measurementPoint: {}, measurementPeriod: {}, gridEnergy: {}, factorValue: {},
  factorYear: {}, connectionType: {}, factorSource: {}, operationalEmissions: {},
  measuredReduction: {}, supplierDocuments: {},
}
