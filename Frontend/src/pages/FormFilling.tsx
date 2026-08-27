import { useState } from 'react'
import styles from './FormFilling.module.css'

const FormFilling = () => {
  const [formData, setFormData] = useState({
    materialName: '',
    materialDescription: '',
    existingMaterialCode: '',
    cpseName: '',
    unitOfMeasurement: '',
    materialCategory: '',
    technicalSpecifications: '',
    manufacturerName: '',
    procurementType: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Material data submitted for harmonization!')
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Material Intake Form</h1>
          <p>Capture material master data for AI-driven standardization.</p>
        </div>
      </div>

      <div className={styles.contentCard}>
        <h2>Material Information</h2>

        <form className={styles.materialForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Material Name <span className={styles.requiredMark}>*</span></label>
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                placeholder="e.g., Stainless Steel Pipe"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Existing Material Code <span className={styles.requiredMark}>*</span></label>
              <input
                type="text"
                name="existingMaterialCode"
                value={formData.existingMaterialCode}
                onChange={handleChange}
                placeholder="e.g., SS-PIPE-001"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Material Description <span className={styles.requiredMark}>*</span></label>
            <textarea
              name="materialDescription"
              value={formData.materialDescription}
              onChange={handleChange}
              placeholder="Enter detailed material description including grade, dimensions, and application..."
              rows={4}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>CPSE Organization <span className={styles.requiredMark}>*</span></label>
              <select
                name="cpseName"
                value={formData.cpseName}
                onChange={handleChange}
                required
              >
                <option value="">Select CPSE</option>
                <option value="ONGC">Oil and Natural Gas Corporation (ONGC)</option>
                <option value="IOCL">Indian Oil Corporation Limited (IOCL)</option>
                <option value="BPCL">Bharat Petroleum Corporation Limited (BPCL)</option>
                <option value="HPCL">Hindustan Petroleum Corporation Limited (HPCL)</option>
                <option value="CPCL">Chennai Petroleum Corporation Limited (CPCL)</option>
                <option value="NTPC">NTPC Limited</option>
                <option value="SAIL">Steel Authority of India Limited (SAIL)</option>
                <option value="COALINDIA">Coal India Limited</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Unit of Measurement <span className={styles.requiredMark}>*</span></label>
              <select
                name="unitOfMeasurement"
                value={formData.unitOfMeasurement}
                onChange={handleChange}
                required
              >
                <option value="">Select UOM</option>
                <option value="MT">Metric Ton (MT)</option>
                <option value="KG">Kilogram (KG)</option>
                <option value="LITER">Liter (L)</option>
                <option value="METER">Meter (M)</option>
                <option value="PIECE">Piece (PCS)</option>
                <option value="SET">Set</option>
                <option value="ROLL">Roll</option>
                <option value="DRUM">Drum</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Material Category</label>
              <select
                name="materialCategory"
                value={formData.materialCategory}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="PIPES">Pipes & Tubes</option>
                <option value="VALVES">Valves</option>
                <option value="FITTINGS">Pipe Fittings</option>
                <option value="FLANGES">Flanges</option>
                <option value="FASTENERS">Fasteners</option>
                <option value="GASKETS">Gaskets & Seals</option>
                <option value="INSTRUMENTS">Instruments</option>
                <option value="ELECTRICAL">Electrical Equipment</option>
                <option value="MECHANICAL">Mechanical Equipment</option>
                <option value="CHEMICALS">Chemicals</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Procurement Type</label>
              <select
                name="procurementType"
                value={formData.procurementType}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="CAPEX">CAPEX</option>
                <option value="OPEX">OPEX</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="PROJECT">Project</option>
                <option value="ROUTINE">Routine</option>
              </select>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label>Technical Specifications</label>
              <textarea
                name="technicalSpecifications"
                value={formData.technicalSpecifications}
                onChange={handleChange}
                placeholder="Enter technical specifications: grade, standards (ASTM/ASME/ISO), pressure rating, temperature range, material composition, etc."
                rows={5}
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Manufacturer/Supplier Name</label>
                <input
                  type="text"
                  name="manufacturerName"
                  value={formData.manufacturerName}
                  onChange={handleChange}
                  placeholder="Enter manufacturer or supplier name"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Make/Origin</label>
                <input
                  type="text"
                  placeholder="e.g., India, USA, Germany"
                />
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.btnPrimary}>
              Submit for Harmonization
            </button>
            <button 
              type="button" 
              className={styles.btnSecondary}
              onClick={() => setFormData({
                materialName: '',
                materialDescription: '',
                existingMaterialCode: '',
                cpseName: '',
                unitOfMeasurement: '',
                materialCategory: '',
                technicalSpecifications: '',
                manufacturerName: '',
                procurementType: ''
              })}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormFilling
