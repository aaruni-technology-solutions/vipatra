// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// You can create an array of sidebar links for easier management
const sidebarLinks = [
    { to: "/dashboard", labelKey: "sidebar.dashboard", iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { to: "/invoices", labelKey: "sidebar.allInvoices", iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { to: "/billing/create-invoice", labelKey: "sidebar.createInvoice", iconPath: "M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
    { to: "/customers", labelKey: "sidebar.customers", iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" },
    { to: "/items", labelKey: "sidebar.items", iconPath: "M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 10h.01M17 17h.01M17 13h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2zm0 10h.01M7 13H2v5a2 2 0 002 2h5a2 2 0 002-2v-5H7z" }, // Item icon
    { to: "/expenses", labelKey: "sidebar.expenses", iconPath: "M9 14l6-6m-5.5-2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM16.5 13.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM21 14H3M21 10H3m5-7h6a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z" },
    { to: "/inventory", labelKey: "sidebar.manageInventory", iconPath: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
    { to: "/reports", labelKey: "sidebar.reports", iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { to: "/settings", labelKey: "sidebar.settings", iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];


const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="w-64 bg-cardBg p-6 hidden lg:block shadow-sidebar border-r border-borderLight flex-shrink-0">
      <h2 className="text-xl font-heading font-bold mb-7 border-b border-borderDefault pb-3 text-primary">
        {t('sidebar.quickMenu', 'Quick Menu')}
      </h2>
      <nav className="space-y-3">
        {sidebarLinks.map(link => (
            <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                    isActive
                    ? "sidebar-link sidebar-link-active flex items-center space-x-3"
                    : "sidebar-link flex items-center space-x-3"
                }
            >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.iconPath} />
                </svg>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t(link.labelKey, link.labelKey.split('.').pop())}</span>
            </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;