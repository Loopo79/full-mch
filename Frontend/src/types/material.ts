export interface MaterialInput {
  materialName: string
  description: string
  existingCode?: string
  category?: string
  unit?: string
}

export interface HarmonizationResult {
  materialId: string
  originalCode?: string
  harmonizedCode: string
  confidence: number
  status: 'matched' | 'review' | 'unmatched'
}

export interface Material {
  id: string
  name: string
  description: string
  originalCode: string
  harmonizedCode: string
  status: 'Harmonized' | 'Review' | 'Unmatched'
  confidence: number
}