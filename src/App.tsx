// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./assets/components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import InventoryEngine from "./pages/InventoryEngine";
import LoanEngine from "./pages/LoanEngine";
import BusinessAdvisor from "./pages/BusinessStartAdvisor";
import TechAdvisor from "./pages/TechAdvisor";
import Sales from "./pages/Sales";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reports" element={<Reports />} />
          <Route path="inventory-engine" element={<InventoryEngine />} />
          <Route path="loan-engine" element={<LoanEngine />} />
          <Route path="business-advisor" element={<BusinessAdvisor />} />
          <Route path="tech-advisor" element={<TechAdvisor />} />
          <Route path="sales" element={<Sales />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;