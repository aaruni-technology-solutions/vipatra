// src/components/layout/Sidebar.jsx
import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Keep getSidebarLinks outside or ensure it's stable if defined inside
const getSidebarLinks = (t) => [
    { to: "/dashboard", labelKey: "sidebar.dashboard", iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { to: "/customers", labelKey: "sidebar.customers", iconPath: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M12 12a4 4 0 110-8 4 4 0 010 8z" }, 
    {
        id: "catalog",
        labelKey: "sidebar.catalog",
        iconPath: "M4 6h16M4 10h16M4 14h16M4 18h16",
        subItems: [
            { to: "/items/products", labelKey: "sidebar.products", iconPath: "M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" },
            { to: "/items/services", labelKey: "sidebar.services", iconPath: "M16 8v8m-3-5v5m-3-3v3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" },
            { to: "/items/subscriptions", labelKey: "sidebar.subscriptionItems", iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
        ]
    },
    { to: "/inventory", labelKey: "sidebar.manageInventory", iconPath: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
     { to: "/estimate", labelKey: "sidebar.newQuote", iconPath: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a2 2 0 01-2 2z" },
{ to: "/invoices", labelKey: "sidebar.allInvoices", iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
     {to:"/payments-received",labelKey:"sidebar.receipts",iconPath:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
    {
        to: "/packing-slips", 
        labelKey: "sidebar.newPackingSlip",
        iconPath: "M12 11v6m-3-3h6M3 6v14a2 2 0 002 2h14a2 2 0 002-2V8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      },
    { to: "/delivery-challans", labelKey: "sidebar.newDeliveryChallan", iconPath: "M0 0h24v24H0z M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" },
    {to:"/credit-notes",labelKey:"sidebar.newCreditNote",iconPath:"M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a2 2 0 01-2 2z"},
    { to: "/expenses", labelKey: "sidebar.expenses", iconPath: "M9 14l6-6m-5.5-2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM16.5 13.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM21 14H3M21 10H3m5-7h6a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z" },
    { to: "/reports", labelKey: "sidebar.reports", iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { to: "/settings", labelKey: "sidebar.settings", iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" },

    { to: "/items", labelKey: "sidebar.items", iconPath: "M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 10h.01M17 17h.01M17 13h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2zm0 10h.01M7 13H2v5a2 2 0 002 2h5a2 2 0 002-2v-5H7z" },
     
];


const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Memoize sidebarLinksConfig so it doesn't change on every render unless `t` changes
  const sidebarLinksConfig = useMemo(() => getSidebarLinks(t), [t]);

  useEffect(() => {
    let needsUpdate = false;
    const newOpenDropdownsState = { ...openDropdowns }; // Start with current state

    sidebarLinksConfig.forEach(link => {
      if (link.subItems && link.id) {
        const isAnySubItemActive = link.subItems.some(subItem => location.pathname.startsWith(subItem.to));
        if (isAnySubItemActive && !newOpenDropdownsState[link.id]) {
          newOpenDropdownsState[link.id] = true;
          needsUpdate = true;
        }
        // Optional: if you want to close dropdowns when no sub-item is active,
        // but this might conflict with manual toggling.
        // else if (!isAnySubItemActive && newOpenDropdownsState[link.id]) {
       //newOpenDropdownsState[link.id] = false;
      //needsUpdate = true;
       // }
      }
    });

    if (needsUpdate) {
      setOpenDropdowns(newOpenDropdownsState);
    }
  }, [location.pathname, sidebarLinksConfig]); // Removed openDropdowns from here to prevent loop from its own update

  const toggleDropdown = (e, linkId) => {
    const linkConfig = sidebarLinksConfig.find(link => link.id === linkId);
    if (linkConfig && linkConfig.subItems) {
        e.preventDefault();
        setOpenDropdowns(prev => ({
            ...prev,
            [linkId]: !prev[linkId]
        }));
    }
  };

  // ... (rest of your JSX rendering logic - this part was okay) ...
  return (
    <aside className="w-64 bg-cardBg p-6 hidden lg:block shadow-sidebar border-r border-borderLight flex-shrink-0">
      <h2 className="text-xl font-heading font-bold mb-7 border-b border-borderDefault pb-3 text-primary">
        {t('sidebar.quickMenu')}
      </h2>
      <nav className="space-y-1">
        {sidebarLinksConfig.map(link => {
          if (link.subItems && link.id) {
            const isAnySubItemActive = link.subItems.some(subItem => location.pathname.startsWith(subItem.to));
            const isOpen = !!openDropdowns[link.id];

            return (
              <div key={link.id}>
                <button
                  onClick={(e) => toggleDropdown(e, link.id)}
                  className={`sidebar-link w-full flex items-center justify-between space-x-3 text-left ${
                    (isAnySubItemActive || isOpen) ? 'sidebar-link-active' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.iconPath} />
                    </svg>
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t(link.labelKey)}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="pl-6 mt-1 space-y-0.5">
                    {link.subItems.map(subItem => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        className={({ isActive }) =>
                          `sidebar-link flex items-center space-x-3 !py-2 text-xs ${isActive ? 'sidebar-link-active' : ''}`
                        }
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={subItem.iconPath} />
                        </svg>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t(subItem.labelKey)}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <NavLink
              key={link.to || link.labelKey}
              to={link.to}
              className={({ isActive }) =>
                `sidebar-link flex items-center space-x-3 ${isActive ? 'sidebar-link-active' : ''}`
              }
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.iconPath} />
              </svg>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">{t(link.labelKey)}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;