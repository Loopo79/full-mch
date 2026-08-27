import type { Material } from '../types/material'

export const mockMaterials: Material[] = [
  {
    id: 'MAT-001',
    name: 'Stainless Steel Sheet',
    description: '304 grade stainless steel sheet',
    originalCode: 'MAT-2048',
    harmonizedCode: 'SS-304-SHT',
    status: 'Harmonized',
    confidence: 98,
  },
  {
    id: 'MAT-002',
    name: 'Industrial Rubber Seal',
    description: 'Rubber sealing component for industrial equipment',
    originalCode: 'MAT-1982',
    harmonizedCode: 'RBR-SEAL-IND',
    status: 'Harmonized',
    confidence: 96,
  },
  {
    id: 'MAT-003',
    name: 'Aluminium Rod',
    description: '6061 aluminium alloy rod',
    originalCode: 'MAT-1756',
    harmonizedCode: 'AL-ROD-6061',
    status: 'Review',
    confidence: 82,
  },
  {
    id: 'MAT-004',
    name: 'Copper Wire',
    description: 'Industrial copper electrical wire',
    originalCode: 'MAT-1632',
    harmonizedCode: 'CU-WIRE-IND',
    status: 'Harmonized',
    confidence: 94,
  },
]