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

export const getDashboardStats = async () => {
  return api.get<{
    totalMaterials: number
    harmonizedCount: number
    harmonizedPercentage: number
    pendingReview: number
    pendingReviewPercentage: number
    processedFiles: number
    avgFilesPerDay: number
    aiMatchAccuracy: number
  }>('/dashboard/stats')
}

export const getRecentActivity = async (limit: number = 5) => {
  return api.get<{ items: Array<{
    material: string
    originalCode: string
    harmonizedCode: string
    status: 'Harmonized' | 'Review' | 'Unmatched'
    confidence: number
  }> }>(`/dashboard/activity?limit=${limit}`)
}

export const uploadCSV = async (file: File) => {
  return api.uploadFile<{
    fileId: string
    fileName: string
    rowCount: number
    columnCount: number
    status: string
    message: string
  }>('/csv/upload', file)
}

export const harmonizeCSV = async (fileId: string, columnMapping: {
  materialName: string
  description: string
  existingCode?: string
  category?: string
}) => {
  return api.post<{
    jobId: string
    status: string
    totalRecords: number
    message: string
  }>('/csv/harmonize', { fileId, columnMapping })
}

export const getJobStatus = async (jobId: string) => {
  return api.get<{
    status: string
    file_id: string
    column_mapping: Record<string, string>
    created_at: string
    total_records: number
    completed_at?: string
  }>(`/jobs/${jobId}`)
}