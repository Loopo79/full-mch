import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import {
    FileSpreadsheet,
    UploadCloud,
    AlertCircle,
    ArrowRight,
    ChevronDown,
    FileCheck2,
    Trash2,
} from "lucide-react";

import type { CSVData, CSVFileInfo, ColumnMapping } from "../types/csv";
import { parseCSV } from "../utils/csvParser";
import styles from "./CSVProcessing.module.css";

const MAPPING_FIELDS = [
    {
        key: "materialName",
        label: "Material Name",
        required: true,
        hint: "Primary item identifier",
    },
    {
        key: "description",
        label: "Description",
        required: true,
        hint: "Detailed specifications",
    },
    {
        key: "existingCode",
        label: "Existing Code",
        required: false,
        hint: "Legacy ERP or SKU",
    },
    {
        key: "category",
        label: "Category",
        required: false,
        hint: "Classification group",
    },
] as const;

const CSVProcessing = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [fileInfo, setFileInfo] = useState<CSVFileInfo | null>(null);
    const [csvData, setCsvData] = useState<CSVData | null>(null);
    const [error, setError] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);

    const [columnMapping, setColumnMapping] = useState<ColumnMapping>({
        materialName: "",
        description: "",
        existingCode: "",
        category: "",
    });
    const [mappingError, setMappingError] = useState("");

    const detectColumn = (columns: CSVData["columns"], keywords: string[]) => {
        const column = columns.find((col) =>
            keywords.some((keyword) =>
                col.name.toLowerCase().trim().includes(keyword),
            ),
        );
        return column?.name || "";
    };

    const handleFile = (file: File) => {
        setError("");
        if (!file.name.toLowerCase().endsWith(".csv")) {
            setError("Please select a valid .csv file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result;
            if (typeof result !== "string") {
                setError("Unable to read the selected file.");
                return;
            }

            try {
                const parsedData = parseCSV(result);
                if (parsedData.columns.length === 0) {
                    setError("The CSV file appears to be empty.");
                    return;
                }

                setCsvData(parsedData);
                setColumnMapping({
                    materialName: detectColumn(parsedData.columns, [
                        "material name",
                        "material",
                        "item",
                        "product",
                    ]),
                    description: detectColumn(parsedData.columns, [
                        "description",
                        "details",
                        "material description",
                    ]),
                    existingCode: detectColumn(parsedData.columns, [
                        "existing code",
                        "material code",
                        "code",
                        "item code",
                    ]),
                    category: detectColumn(parsedData.columns, [
                        "category",
                        "group",
                        "material group",
                        "type",
                    ]),
                });
                setMappingError("");
                setFileInfo({
                    name: file.name,
                    size: file.size,
                    rows: parsedData.rows.length,
                    columns: parsedData.columns.length,
                });
            } catch {
                setError("Unable to parse CSV structure.");
            }
        };

        reader.onerror = () =>
            setError("An error occurred while reading the file.");
        reader.readAsText(file);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const handleRemoveFile = () => {
        setFileInfo(null);
        setCsvData(null);
        setError("");
        setColumnMapping({
            materialName: "",
            description: "",
            existingCode: "",
            category: "",
        });
        setMappingError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleMappingChange = (field: keyof ColumnMapping, value: string) => {
        setColumnMapping((prev) => ({ ...prev, [field]: value }));
        setMappingError("");
    };

    const handleContinue = () => {
        if (!columnMapping.materialName) {
            setMappingError("Please select a column for Material Name.");
            return;
        }
        if (!columnMapping.description) {
            setMappingError("Please select a column for Description.");
            return;
        }
        setMappingError("");
        console.log("Column Mapping Submitted:", columnMapping);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>Data Import & Mapping</h1>
                <p className={styles.subtitle}>
                    Upload source CSV files and harmonize schema attributes.
                </p>
            </header>

            {/* Main Workspace */}
            <div className={styles.workspace}>
                {/* Left Control Column */}
                <div className={styles.controlColumn}>
                    {/* File Upload */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.stepBadge}>1</div>
                            <h2 className={styles.cardTitle}>
                                Upload Source File
                            </h2>
                        </div>

                        {!fileInfo ? (
                            <div
                                className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".csv,text/csv"
                                    onChange={handleFileChange}
                                    hidden
                                />
                                <div className={styles.uploadIconBadge}>
                                    <UploadCloud size={20} />
                                </div>
                                <div className={styles.uploadTextGroup}>
                                    <p className={styles.uploadPrimaryText}>
                                        <span>Click to upload</span> or drag
                                        file here
                                    </p>
                                    <span
                                        className={styles.uploadSecondaryText}
                                    >
                                        CSV format • Up to 25MB
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.activeFileBar}>
                                <div className={styles.fileIconBox}>
                                    <FileSpreadsheet size={18} />
                                </div>
                                <div className={styles.fileDetails}>
                                    <strong className={styles.fileName}>
                                        {fileInfo.name}
                                    </strong>
                                    <div className={styles.fileMeta}>
                                        <span>
                                            {formatFileSize(fileInfo.size)}
                                        </span>
                                        <span className={styles.metaDivider}>
                                            •
                                        </span>
                                        <span>
                                            {fileInfo.rows.toLocaleString()}{" "}
                                            rows
                                        </span>
                                        <span className={styles.metaDivider}>
                                            •
                                        </span>
                                        <span>{fileInfo.columns} cols</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={handleRemoveFile}
                                    title="Remove file"
                                    aria-label="Remove file"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className={styles.alertError}>
                                <AlertCircle size={15} />
                                <span>{error}</span>
                            </div>
                        )}
                    </section>

                    {/* Schema Mapping */}
                    {csvData && (
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.stepBadge}>2</div>
                                <h2 className={styles.cardTitle}>
                                    Column Mapping
                                </h2>
                            </div>

                            <div className={styles.mappingList}>
                                {MAPPING_FIELDS.map((field) => {
                                    const currentValue =
                                        columnMapping[
                                            field.key as keyof ColumnMapping
                                        ];
                                    const isConfigured = Boolean(currentValue);
                                    return (
                                        <div
                                            key={field.key}
                                            className={styles.fieldItem}
                                        >
                                            <div
                                                className={styles.fieldLabelRow}
                                            >
                                                <label
                                                    htmlFor={`map-${field.key}`}
                                                >
                                                    {field.label}
                                                    {field.required && (
                                                        <span
                                                            className={
                                                                styles.requiredMark
                                                            }
                                                        >
                                                            *
                                                        </span>
                                                    )}
                                                </label>
                                                <span
                                                    className={styles.fieldHint}
                                                >
                                                    {field.hint}
                                                </span>
                                            </div>

                                            <div
                                                className={styles.selectWrapper}
                                            >
                                                <select
                                                    id={`map-${field.key}`}
                                                    value={currentValue}
                                                    onChange={(e) =>
                                                        handleMappingChange(
                                                            field.key as keyof ColumnMapping,
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={`${styles.selectInput} ${!isConfigured ? styles.selectEmpty : ""}`}
                                                >
                                                    <option value="">
                                                        Select source column...
                                                    </option>
                                                    {csvData.columns.map(
                                                        (col) => (
                                                            <option
                                                                key={col.index}
                                                                value={col.name}
                                                            >
                                                                {col.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                                <ChevronDown
                                                    className={
                                                        styles.selectIcon
                                                    }
                                                    size={15}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {mappingError && (
                                <div className={styles.alertError}>
                                    <AlertCircle size={15} />
                                    <span>{mappingError}</span>
                                </div>
                            )}

                            <div className={styles.actionFooter}>
                                <button
                                    type="button"
                                    className={styles.submitBtn}
                                    onClick={handleContinue}
                                >
                                    Process & Harmonize Data
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Preview Column */}
                <div className={styles.previewColumn}>
                    <section className={`${styles.card} ${styles.previewCard}`}>
                        <div className={styles.previewTitleGroup}>
                            <div>
                                <h2 className={styles.cardTitle}>
                                    Data Preview
                                </h2>
                                {csvData && (
                                    <p className={styles.cardDescription}>
                                        Inspecting first 10 rows
                                    </p>
                                )}
                            </div>
                        </div>

                        {!csvData ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIconBadge}>
                                    <FileCheck2 size={26} />
                                </div>
                                <h3>No data loaded</h3>
                                <p>
                                    Upload a CSV file on the left panel to
                                    inspect raw fields and preview mappings.
                                </p>
                            </div>
                        ) : (
                            <div className={styles.tableContainer}>
                                <table className={styles.dataTable}>
                                    <thead>
                                        <tr>
                                            <th className={styles.colIndex}>
                                                #
                                            </th>
                                            {csvData.columns.map((col) => {
                                                const isMapped = Object.values(
                                                    columnMapping,
                                                ).includes(col.name);
                                                return (
                                                    <th
                                                        key={col.index}
                                                        className={
                                                            isMapped
                                                                ? styles.thMapped
                                                                : ""
                                                        }
                                                    >
                                                        {col.name}
                                                        {isMapped && (
                                                            <span
                                                                className={
                                                                    styles.mappedDot
                                                                }
                                                                title="Column mapped"
                                                            />
                                                        )}
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {csvData.rows
                                            .slice(0, 10)
                                            .map((row, rIdx) => (
                                                <tr key={rIdx}>
                                                    <td
                                                        className={
                                                            styles.colIndex
                                                        }
                                                    >
                                                        {rIdx + 1}
                                                    </td>
                                                    {csvData.columns.map(
                                                        (col) => (
                                                            <td key={col.index}>
                                                                {row[
                                                                    col.index
                                                                ] || (
                                                                    <span
                                                                        className={
                                                                            styles.nullCell
                                                                        }
                                                                    >
                                                                        —
                                                                    </span>
                                                                )}
                                                            </td>
                                                        ),
                                                    )}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CSVProcessing;