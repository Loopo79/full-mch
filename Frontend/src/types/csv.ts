export interface CSVFileInfo {
  name: string
  size: number
  rows: number
  columns: number
}

export interface CSVColumn {
  name: string
  index: number
}

export interface CSVData {
  columns: CSVColumn[]
  rows: string[][]
}

export interface ColumnMapping {
  materialName: string
  description: string
  existingCode: string
  category: string
}