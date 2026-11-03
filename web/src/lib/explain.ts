import { evaluate, type RuleInput } from '../../shared/rules.ts'
import type { Evaluation } from '../../shared/types.ts'
import type { SiteLanguage } from '../site.ts'

/** Render both languages from the same findings, inputs and thresholds as the dataset. */
export function explain<T extends Evaluation & RuleInput>(record: T, language: SiteLanguage): T {
  return { ...record, ...evaluate(record, undefined, language) }
}
