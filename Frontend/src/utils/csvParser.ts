import type { CSVColumn, CSVData } from '../types/csv'

export const parseCSV = (text: string): CSVData => {
  const lines = text
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')

  if (lines.length === 0) {
    return {
      columns: [],
      rows: [],
    }
  }

  const parseLine = (line: string): string[] => {
    const values: string[] = []
    let current = ''
    let insideQuotes = false

    for (let i = 0; i < line.length; i++) {
      const character = line[i]

      if (character === '"') {
        if (insideQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          insideQuotes = !insideQuotes
        }
      } else if (character === ',' && !insideQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += character
      }
    }

    values.push(current.trim())

    return values
  }

  const headerValues = parseLine(lines[0])

  const columns: CSVColumn[] = headerValues.map(
    (name, index) => ({
      name: name || `Column ${index + 1}`,
      index,
    }),
  )

  const rows = lines.slice(1).map(parseLine)

  return {
    columns,
    rows,
  }
}