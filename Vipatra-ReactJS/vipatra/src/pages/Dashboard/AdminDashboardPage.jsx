// src/pages/Dashboard/AdminDashboardPage.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header'; // Adjust path as needed
import Sidebar from '../../components/layout/Sidebar'; // Adjust path as needed
import Footer from '../../components/layout/Footer';   // Create Footer.jsx if you haven't

// Dummy data for dashboard cards - replace with actual data fetching
const revenueData = {
    today: "12,560",
    week: "75,320",
    month: "2,85,900",
    collectedMonth: "2,50,100",
    outstandingMonth: "35,800"
};

const pendingInvoicesData = [
    { id: "INV-2024-0078", client: "Wellness Clinic", dueText: "Due: 2 days", amount: "3,500", status: "Pending", statusClass: "status-pending" },
    { id: "INV-2024-0075", client: "Priya Singh", dueText: "OVERDUE: 5 days", amount: "1,850", status: "Overdue", statusClass: "status-overdue" }
];

const scheduleData = [
    { time: "10:00 AM", event: "Consultation: Mr. A. Kumar", details: "Status: Confirmed | Billing: Post-session" },
    { time: "02:30 PM", event: "Therapy Session: Ms. S. Patel", details: "Status: Confirmed | Billing: Package (Invoice #P034)" },
    { time: "07:00 PM", event: "Scheduled Batch Billing: Yoga Class (Evening)", details: "Attendees: 12" }
];

const inventoryAlertsData = [
    { name: "Syringes (10ml) - Low Stock!", details: "Current: 8 units | Threshold: 10 units", statusClass: "bg-danger-light text-danger-dark", action: "Restock" },
    { name: "Pain Relief Balm - Nearing Limit", details: "Current: 25 units | Threshold: 20 units", statusClass: "bg-warning-light text-warning-dark", action: "View Details" }
];


const AdminDashboardPage = () => {
  const { t } = useTranslation(); // Hook for translations

  return (
    <>
   <Header />
    <div className="flex flex-col max-h-screen">
     
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-heading text-primary">{t('dashboard.adminTitle', 'Admin Dashboard')}</h2>
            <p className="text-secondary font-sans">{t('dashboard.adminSubtitle', 'Overview of your business performance and alerts.')}</p>
          </div>

          {/* 1. Revenue Overview */}
          <section className="mb-8">
            <h3 className="text-xl font-heading text-primary mb-4">{t('dashboard.revenueOverview', 'Revenue Overview')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="dashboard-card text-center">
                <p className="text-sm text-secondary font-sans uppercase tracking-wider">{t('dashboard.revenueToday', "Today's Revenue")}</p>
                <p className="text-3xl font-bold font-sans text-primary mt-1">₹{revenueData.today}</p>
              </div>
              <div className="dashboard-card text-center">
                <p className="text-sm text-secondary font-sans uppercase tracking-wider">{t('dashboard.revenueWeek', "This Week (MTD)")}</p>
                <p className="text-3xl font-bold font-sans text-primary mt-1">₹{revenueData.week}</p>
              </div>
              <div className="dashboard-card text-center">
                <p className="text-sm text-secondary font-sans uppercase tracking-wider">{t('dashboard.revenueMonth', "This Month (MTD)")}</p>
                <p className="text-3xl font-bold font-sans text-primary mt-1">₹{revenueData.month}</p>
              </div>
              <div className="dashboard-card text-center">
                <p className="text-sm text-secondary font-sans uppercase tracking-wider">{t('dashboard.collectedMonth', "Collected Payments (Month)")}</p>
                <p className="text-3xl font-bold font-sans text-primary-dark mt-1">₹{revenueData.collectedMonth}</p>
                <p className="text-xs text-secondary font-sans">{t('dashboard.outstanding', "Outstanding")}: ₹{revenueData.outstandingMonth}</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* 3. Pending Invoices */}
              <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-heading text-primary">{t('dashboard.pendingInvoices', 'Pending Invoices')}</h3>
                    <a href="#" className="text-sm font-sans text-secondary hover:text-accent">{t('viewAll', 'View All')}</a>
                </div>
                <div className="dashboard-card space-y-4">
                  {pendingInvoicesData.map(invoice => (
                    <div key={invoice.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-background rounded-lg hover:shadow-md transition-shadow">
                      <div>
                        <p className="font-semibold text-primary font-sans">{invoice.id} <span className="text-xs text-secondary">({t('client', 'Client')}: {invoice.client})</span></p>
                        <p className={`text-xs font-sans ${invoice.status === 'Overdue' ? 'text-danger-DEFAULT' : 'text-secondary'}`}>{t(invoice.dueText.toLowerCase().replace(/[:\s]/g, '_'), invoice.dueText)} | {t('amount', 'Amount')}: ₹{invoice.amount}</p>
                      </div>
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        <button className="text-xs font-sans bg-accent hover:bg-accent-dark text-textDark px-3 py-1.5 rounded-lg shadow-soft transition-colors">{t('actions.followUp', 'Follow-Up')}</button>
                        <button className={`text-xs font-sans px-3 py-1.5 rounded-lg transition-colors ${invoice.status === 'Overdue' ? 'bg-danger-DEFAULT hover:bg-danger-dark text-textLight' : 'bg-primary/10 hover:bg-primary/20 text-primary-dark'}`}>{t('actions.sendReminder', 'Send Reminder')}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Upcoming Appointments & Scheduled Billing */}
              <section>
                <h3 className="text-xl font-heading text-primary mb-4">{t('dashboard.todaysSchedule', "Today's Schedule & Billing")}</h3>
                <div className="dashboard-card space-y-4">
                  {scheduleData.map((item, index) => (
                     <div key={index} className="p-3 bg-background rounded-lg">
                        <p className="font-semibold text-primary font-sans">{t(item.event.toLowerCase().replace(/[:\s]/g, '_'), item.event)}</p>
                        <p className="text-xs text-secondary font-sans">{t(item.details.toLowerCase().replace(/[:\s|#]/g, '_'), item.details)}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* 2. Inventory Alerts */}
            <aside className="lg:col-span-1 space-y-8">
                <section>
                    <h3 className="text-xl font-heading text-primary mb-4">{t('dashboard.inventoryAlerts', 'Inventory Alerts')}</h3>
                    <div className="dashboard-card space-y-4">
                    {inventoryAlertsData.map((alert, index) => (
                        <div key={index} className={`p-3 rounded-lg ${alert.statusClass}`}>
                            <p className={`font-semibold font-sans ${alert.statusClass.includes('danger') ? 'text-danger-dark' : 'text-warning-dark'}`}>{t(alert.name.toLowerCase().replace(/[:\s(!)]/g, '_'), alert.name)}</p>
                            <p className="text-xs text-secondary font-sans">{t(alert.details.toLowerCase().replace(/[:\s|]/g, '_'), alert.details)}</p>
                            <button className={`mt-2 text-xs font-sans px-3 py-1.5 rounded-lg shadow-soft transition-colors ${alert.action === 'Restock' ? 'bg-primary hover:bg-primary-dark text-textOnPrimary' : 'bg-secondary hover:bg-secondary/80 text-textOnSecondary'}`}>
                                {t(`actions.${alert.action.toLowerCase()}`, alert.action)}
                            </button>
                        </div>
                    ))}
                    <a href="/inventory" className="block text-center text-sm font-sans text-secondary hover:text-accent pt-2">{t('dashboard.manageFullInventory', 'Manage Full Inventory')}</a>
                    </div>
                </section>
            </aside>
          </div>
        </main>
      </div>
      <Footer /> {/* Create Footer.jsx if you haven't */}
    </div>
      </>
  );
};

export default AdminDashboardPage;