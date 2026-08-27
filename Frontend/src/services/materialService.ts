import type {
  HarmonizationResult,
  MaterialInput,
} from '../types/material'

import { api } from './api'

export const harmonizeMaterial = async (
  material: MaterialInput,
): Promise<HarmonizationResult> => {
  return api.post<HarmonizationResult>(
    '/materials/harmonize',
    material,
  )
}