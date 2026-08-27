import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import CSVProcessing from './pages/CSVProcessing'
import FormFilling from './pages/FormFilling'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/csv" element={<CSVProcessing />} />
          <Route path="/form" element={<FormFilling />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App