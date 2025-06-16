// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Removed import './App.css'; // Keep this commented unless you have specific App.css styles that don't conflict with full-width layout

// Import your page components
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import AdminDashboardPage from './pages/Dashboard/AdminDashboardPage';
import PackingSlipCreatePage from './pages/PackingSlips/PackingSlipCreatePage';
import CustomersListPage from './pages/Customers/CustomersListPage';
import CustomerCreatePage from './pages/Customers/CustomersCreatePage';
import CustomerViewPage from './pages/Customers/CustomersViewPage';
import CreditNoteCreatePage from './pages/Billing/CreditNoteCreatePage';
import CreditNotesListPage from './pages/Billing/CreditNotesListPage';
// ItemsListPage will handle different item types based on URL param
import ItemsListPage from './pages/Items/ItemsListPage';
// ItemCreatePage might be a separate component or integrated into ItemsListPage logic
// For now, assuming ItemsListPage handles the "Create Item" form visibility
// import ItemCreatePage from './pages/Items/ItemCreatePage'; // If you have a dedicated create page different from ItemsListPage
import Layout from './components/layout/Layout'; // Import the new Layout

import InvoicesListPage from './pages/Invoices/InvoicesListPage';
import InvoiceCreatePage from './pages/Invoices/InvoicesCreatePage';
import InvoiceViewPage from './pages/Invoices/InvoicesViewPage';
// import RecurringInvoiceCreatePage from './pages/Invoices/RecurringInvoiceCreatePage';

import InventoryDashboardPage from './pages/Inventory/InventoryDashboardPage';
import ExpensesListPage from './pages/Expenses/ExpensesListPage';
import ExpenseCreatePage from './pages/Expenses/ExpenseCreatePage';
import MileagePreferencesPage from './pages/Expenses/MileagePreferencesPage';
import ReportsPage from './pages/Reports/ReportsPage';
import SettingsPage from './pages/Settings/SettingsPage';
// import SupportPage from './pages/Support/SupportPage';
import PaymentReceiptPage from './pages/Payments/PaymentRecievedCreatePage';
import EstimatesPage from './pages/Quotes/EstimatesPage';
import PackingSlipsListPage from './pages/PackingSlips/PackingSlipsListPage';
import DeliveryChallanCreatePage from './pages/DeliveryChallans/DeliveryChallanCreatePage';
// You might also need list pages for Quotes and Delivery Challans
// import QuotesListPage from './pages/Quotes/QuotesListPage';
// import DeliveryChallansListPage from './pages/DeliveryChallans/DeliveryChallansListPage';
import DeliveryChallansListPage from './pages/DeliveryChallans/DeliveryChallansListPage';
import NotFoundPage from './pages/NotFoundPage';
import QuoteCreatePage from './pages/Quotes/QuoteCreatePage';
import PaymentsReceivedListPage from './pages/Payments/PaymentsReceivedListPage';
function App() {
  const isAuthenticated = true; // Placeholder for your actual auth logic

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes Logic */}
        <Route
          path="/*" // This will capture all other paths
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

// Component to define all routes accessible after authentication
const ProtectedRoutes = () => {
  return (
    <Routes>
      
      {/* Dashboard */}
      <Route path="dashboard" element={<AdminDashboardPage />} />
     
      {/* Customers */}
      <Route path="customers" element={<CustomersListPage />} />
      <Route path="customers/new" element={<CustomerCreatePage />} />
      <Route path="customers/:customerId" element={<CustomerViewPage />} />
      <Route path="payments-received/new" element={<PaymentReceiptPage />} />
       <Route path="estimate/" element={<EstimatesPage />} />
        <Route path="quotes/new" element={<QuoteCreatePage />} />
      {/* Items (Catalog: Products, Services, Subscriptions) */}
      {/* The ItemsListPage will use the :itemTypeUrlParam to filter/display correctly */}
       <Route path="/credit-notes" element={<CreditNotesListPage />} />
      <Route path="items" element={<ItemsListPage />} /> {/* General items page, might show all or a default */}
      <Route path="items/products" element={<ItemsListPage />} />
      <Route path="items/services" element={<ItemsListPage />} />
      <Route path="items/subscriptions" element={<ItemsListPage />} />
      {/* If you decide "Create Item" is always on ItemsListPage, you don't need a separate /items/new route
          unless ItemCreatePage is a distinct component. If ItemsListPage handles the create form visibility,
          the "Create Item" button on ItemsListPage would just toggle a form on that same page.
          If ItemCreatePage IS a separate component, then uncomment:
      <Route path="items/new" element={<ItemCreatePage />} />
      */}
<Route path="credit-notes/new" element={<CreditNoteCreatePage />} />
 <Route path="/credit-notes" element={<CreditNotesListPage />} />
<Route path="/payments-received" element={<PaymentsReceivedListPage />} />
      {/* Invoices */}
      <Route path="invoices" element={<InvoicesListPage />} />
      <Route path="invoices/new" element={<InvoiceCreatePage />} />
      <Route path="invoices/:invoiceId" element={<InvoiceViewPage />} />
      {/* <Route path="invoices/recurring/new" element={<RecurringInvoiceCreatePage />} /> */}

      {/* Inventory */}
      <Route path="inventory" element={<InventoryDashboardPage />} />
      {/* Note: "Manage Items" from your sidebar might also point to "inventory" or "/items"
          depending on how you want to structure the overall inventory vs. item catalog concept.
          For now, /inventory points to the Inventory Dashboard.
      */}
      <Route path="/packing-slips" element={<PackingSlipsListPage />} />
     <Route path="packing-slips/new" element={<PackingSlipCreatePage />} />
      {/* Quotes */}
    
      {/* Consider adding a list page: <Route path="quotes" element={<QuotesListPage />} /> */}

      {/* Delivery Challans */}
       <Route path="/delivery-challans" element={<DeliveryChallansListPage />} />
      <Route path="delivery-challans/new" element={<DeliveryChallanCreatePage />} />
      {/* Consider adding a list page: <Route path="delivery-challans" element={<DeliveryChallansListPage />} /> */}

      {/* Expenses */}
       <Route path="/expenses" element={<ExpensesListPage />} />
        <Route path="/expenses/new" element={<ExpenseCreatePage />} />
        <Route path="/expenses/preferences" element={<MileagePreferencesPage />} />
      {/* Reports */}
      <Route path="reports" element={<ReportsPage />} />

      {/* Settings */}
      <Route path="settings" element={<SettingsPage />} />
      {/* For deep linking into settings sections if you implement hash-based routing there: */}
      {/* <Route path="settings/:sectionId" element={<SettingsPage />} /> */}


      {/* Default route for authenticated area if no other sub-path matches (e.g., user lands on just "/") */}
      <Route index element={<Navigate to="dashboard" replace />} />

      {/* Fallback 404 for any unmatched path within the authenticated area */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;