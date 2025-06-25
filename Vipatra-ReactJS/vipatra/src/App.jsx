// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- Layout Component ---
import Layout from './components/layout/Layout';

// --- Page Components ---
// Auth
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

// Core
import AdminDashboardPage from './pages/Dashboard/AdminDashboardPage';
import ReportsPage from './pages/Reports/ReportsPage';
import SettingsPage from './pages/Settings/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Customers
import CustomersListPage from './pages/Customers/CustomersListPage';
import CustomersPage from './pages/Customers/CustomersCreatePage';
import CustomerViewPage from './pages/Customers/CustomersViewPage';

// Sales & Billing
import InvoicesListPage from './pages/Invoices/InvoicesListPage';
import InvoiceCreatePage from './pages/Invoices/InvoicesCreatePage';
import InvoiceViewPage from './pages/Invoices/InvoicesViewPage';
import EstimatesPage from './pages/Quotes/EstimatesPage';
import QuoteCreatePage from './pages/Quotes/QuoteCreatePage';
import PaymentsReceivedListPage from './pages/Payments/PaymentsReceivedListPage';
import PaymentReceivedCreatePage from './pages/Payments/PaymentRecievedCreatePage';
import CreditNotesListPage from './pages/Billing/CreditNotesListPage';
import CreditNoteCreatePage from './pages/Billing/CreditNoteCreatePage';

// Items & Inventory
import ItemsList from './pages/Items/ItemsList';
import ItemsPage from './pages/Items/ItemsPage';
import ItemsCreatePage from './pages/Items/ItemsCreatePage';
import InventoryDashboardPage from './pages/Inventory/InventoryDashboardPage';
import AuditLogsPage from './pages/Admin/AuditLogsPage';
// Shipping
import PackingSlipsListPage from './pages/PackingSlips/PackingSlipsListPage';
import PackingSlipCreatePage from './pages/PackingSlips/PackingSlipCreatePage';
import DeliveryChallansListPage from './pages/DeliveryChallans/DeliveryChallansListPage';
import DeliveryChallanCreatePage from './pages/DeliveryChallans/DeliveryChallanCreatePage';

// Expenses
import ExpensesListPage from './pages/Expenses/ExpensesListPage';
import ExpenseCreatePage from './pages/Expenses/ExpenseCreatePage';
import MileagePreferencesPage from './pages/Expenses/MileagePreferencesPage';

function App() {
  const isAuthenticated = true; // Placeholder for your actual auth logic

  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* --- Protected Routes --- */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <ProtectedRoutes />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

// All routes inside here are protected and use the main application Layout
const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Default route for authenticated area */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        {/* --- Core Pages --- */}
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* --- Customers --- */}
        <Route path="customers" element={<CustomersListPage />} />
        <Route path="customers/new" element={<CustomersPage />} />
        <Route path="customers/:customerId" element={<CustomerViewPage />} />

        {/* --- Sales & Billing --- */}
        <Route path="invoices" element={<InvoicesListPage />} />
        <Route path="invoices/new" element={<InvoiceCreatePage />} />
        <Route path="invoices/:invoiceId" element={<InvoiceViewPage />} />
        
        <Route path="estimates" element={<EstimatesPage />} />
        <Route path="quotes/new" element={<QuoteCreatePage />} />

        <Route path="payments-received" element={<PaymentsReceivedListPage />} />
        <Route path="payments-received/new" element={<PaymentReceivedCreatePage />} />

        <Route path="credit-notes" element={<CreditNotesListPage />} />
        <Route path="credit-notes/new" element={<CreditNoteCreatePage />} />
        
        {/* --- Items & Inventory --- */}
        <Route path="items" element={<ItemsList />} />
         <Route path="items/new" element={<ItemsCreatePage />} />
        <Route path="items/products" element={<ItemsPage />} />
        <Route path="items/services" element={<ItemsPage />} />
        <Route path="items/subscriptions" element={<ItemsPage />} />
        <Route path="inventory" element={<InventoryDashboardPage />} />
        
        {/* --- Shipping --- */}
        <Route path="packing-slips" element={<PackingSlipsListPage />} />
        <Route path="packing-slips/new" element={<PackingSlipCreatePage />} />
        
        <Route path="delivery-challans" element={<DeliveryChallansListPage />} />
        <Route path="delivery-challans/new" element={<DeliveryChallanCreatePage />} />
        <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
        {/* --- Expenses --- */}
        <Route path="expenses" element={<ExpensesListPage />} />
        <Route path="expenses/new" element={<ExpenseCreatePage />} />
        <Route path="expenses/preferences" element={<MileagePreferencesPage />} />

        {/* Fallback 404 for any unmatched path within the authenticated area */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;