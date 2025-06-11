// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Import your page components
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import AdminDashboardPage from './pages/Dashboard/AdminDashboardPage';
import CustomersListPage from './pages/Customers/CustomersListPage';
import CustomerCreatePage from './pages/Customers/CustomersCreatePage';
// import CustomerViewPage from './pages/Customers/CustomerViewPage'; // Assuming you'll create this
import ItemsListPage from './pages/Items/ItemsListPage';
import ItemCreatePage from './pages/Items/ItemCreatePage';
// import ItemViewPage from './pages/Items/ItemViewPage'; // Assuming you'll create this
import InvoiceCreatePage from './pages/Invoices/InvoicesCreatePage';
import InvoiceViewPage from './pages/Invoices/InvoicesViewPage';
import InvoicesListPage from './pages/Invoices/InvoicesListPage';
// import RecurringInvoiceCreatePage from './pages/Invoices/RecurringInvoiceCreatePage'; // Assuming
import InventoryDashboardPage from './pages/Inventory/InventoryDashboardPage';
import SettingsPage from './pages/Settings/SettingsPage';
// import SupportPage from './pages/Support/SupportPage'; // Assuming
import NotFoundPage from './pages/NotFoundPage';
import CustomerViewPage from './pages/Customers/CustomersViewPage';
import ExpensesPage from './pages/Expenses/ExpensesPage';
import ReportsPage from './pages/Reports/ReportsPage';
import QuoteCreatePage from './pages/Quotes/QuoteCreatePage';
import DeliveryChallanCreatePage from './pages/DeliveryChallans/DeliveryChallanCreatePage';
function App() {
  // Basic concept for authentication state (replace with your actual auth logic)
  // In a real app, this would come from Context API, Redux, Zustand, etc.
  const isAuthenticated = true; // For testing, assume user is authenticated

  return (
    <Router>
      <Routes>
        {/* Public Routes: Rendered directly */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes Wrapper */}
        {/* This route will match any path not caught by /login or /signup */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <ProtectedRoutes /> /* All authenticated routes are defined within ProtectedRoutes */
            ) : (
              <Navigate to="/login" replace /> /* If not authenticated, redirect to login */
            )
          }
        />
      </Routes>
    </Router>
  );
}

// Component to define all routes accessible after authentication
const ProtectedRoutes = () => {
  // Each page component (e.g., AdminDashboardPage) is expected to render its own
  // Header, Sidebar, Main content area, and Footer, and its outermost div
  // should be something like <div className="flex flex-col min-h-screen">
  // to take up the full space provided by the router.
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboardPage />} /> {/* Note: paths are relative to the parent "/*" */}
      
      <Route path="customers" element={<CustomersListPage />} />
      <Route path="customers/new" element={<CustomerCreatePage />} />
      <Route path="customers/:customerId" element={<CustomerViewPage />} />
      {/* Example for a customer detail page: */}
      {/* <Route path="customers/:customerId" element={<CustomerViewPage />} /> */}

      <Route path="items" element={<ItemsListPage />} />
      <Route path="items/new" element={<ItemCreatePage />} />
      {/* <Route path="items/:itemId" element={<ItemViewPage />} /> */}

      <Route path="invoices" element={<InvoicesListPage />} />
      <Route path="invoices/new" element={<InvoiceCreatePage />} />
      <Route path="invoices/:invoiceId" element={<InvoiceViewPage />} />
      {/* <Route path="invoices/recurring/new" element={<RecurringInvoiceCreatePage />} /> */}

      <Route path="inventory" element={<InventoryDashboardPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="reports" element={<ReportsPage />} />
      {/* <Route path="support" element={<SupportPage />} /> */}
      <Route path="expenses" element={<ExpensesPage />} />
      <Route path="delivery-challans/new" element={<DeliveryChallanCreatePage />} />
      {/* Default route for authenticated area if no other sub-path matches (e.g., if user lands on just "/") */}
      {/* This makes `/` (after login) redirect to `/dashboard` */}
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="quotes/new" element={<QuoteCreatePage />} />
      {/* Fallback 404 for any unmatched path within the authenticated area */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;