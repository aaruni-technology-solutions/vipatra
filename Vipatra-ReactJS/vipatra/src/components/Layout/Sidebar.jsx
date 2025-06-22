// src/components/layout/Sidebar.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Using consistent icon imports from heroicons
import {
    HomeIcon, UsersIcon, CollectionIcon, InboxInIcon, DocumentTextIcon, DocumentReportIcon,
    ReceiptTaxIcon, TruckIcon, PaperAirplaneIcon, CreditCardIcon, CashIcon, CogIcon, ChartBarIcon,
    CubeIcon, AdjustmentsIcon, CalendarIcon
} from '@heroicons/react/outline';

const getSidebarLinks = (t) => [
    { to: "/dashboard", labelKey: "sidebar.dashboard", Icon: HomeIcon },
    { to: "/customers", labelKey: "sidebar.customers", Icon: UsersIcon },
    {
        id: "catalog",
        labelKey: "sidebar.catalog",
        Icon: CollectionIcon,
        subItems: [
            { to: "/items/products", labelKey: "sidebar.products", Icon: CubeIcon },
            { to: "/items/services", labelKey: "sidebar.services", Icon: AdjustmentsIcon },
            { to: "/items/subscriptions", labelKey: "sidebar.subscriptionItems", Icon: CalendarIcon },
        ]
    },
    { to: "/inventory", labelKey: "sidebar.manageInventory", Icon: InboxInIcon }, // Changed label for clarity
    { to: "/estimates", labelKey: "sidebar.newQuote", Icon: DocumentTextIcon }, // Corrected path
    { to: "/invoices", labelKey: "sidebar.allInvoices", Icon: DocumentReportIcon }, // Corrected label
    { to: "/payments-received", labelKey: "sidebar.receipts", Icon: ReceiptTaxIcon }, // Corrected path
    { to: "/packing-slips", labelKey: "sidebar.newPackingSlip", Icon: TruckIcon },
    { to: "/delivery-challans", labelKey: "sidebar.newDeliveryChallan", Icon: PaperAirplaneIcon },
    { to: "/credit-notes", labelKey: "sidebar.newCreditNote", Icon: CreditCardIcon },
    { to: "/expenses", labelKey: "sidebar.expenses", Icon: CashIcon },
    {to:"/admin/audit-logs",labelKey:"sidebar.auditLogs",Icon:AdjustmentsIcon},
    { to: "/reports", labelKey: "sidebar.reports", Icon: ChartBarIcon },
    { to: "/settings", labelKey: "sidebar.settings", Icon: CogIcon },
];

const Sidebar = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [openDropdowns, setOpenDropdowns] = useState({});

    const sidebarLinksConfig = useMemo(() => getSidebarLinks(t), [t]);

    // This effect opens the dropdown if a child link is active when the page loads
    useEffect(() => {
        const activeDropdownId = sidebarLinksConfig.find(link => 
            link.subItems?.some(sub => location.pathname.startsWith(sub.to))
        )?.id;

        if (activeDropdownId) {
            setOpenDropdowns(prev => ({ ...prev, [activeDropdownId]: true }));
        }
    }, [location.pathname, sidebarLinksConfig]);

    const toggleDropdown = (e, linkId) => {
        e.preventDefault();
        setOpenDropdowns(prev => ({ ...prev, [linkId]: !prev[linkId] }));
    };

    // Styling function for NavLink
    const getNavLinkClass = (isActive) =>
        `sidebar-link flex items-center space-x-3 ${isActive ? 'sidebar-link-active' : ''}`;
    
    // Styling function for sub-item NavLink
    const getSubNavLinkClass = (isActive) =>
        `sidebar-link flex items-center space-x-3 !py-2 text-xs ${isActive ? 'sidebar-link-active' : ''}`;

    return (
        // The main sidebar container is a flex column.
        <aside className="w-64 bg-cardBg p-4 hidden lg:flex flex-col border-r border-borderLight flex-shrink-0">
            
            {/* 1. TOP SECTION (LOGO/TITLE) - This part will NOT scroll */}
            

            {/* 2. NAVIGATION AREA - This part WILL scroll */}
            {/* KEY CHANGE: Added flex-1 and overflow-y-auto to make this section fill space and scroll */}
            <div className="flex-1 overflow-y-auto">
               
                <nav className="space-y-1">
                    {sidebarLinksConfig.map(link => {
                        // RENDER DROPDOWN PARENT
                        if (link.subItems && link.id) {
                            const isOpen = !!openDropdowns[link.id];
                            return (
                                <div key={link.id}>
                                    <button onClick={(e) => toggleDropdown(e, link.id)} className="sidebar-link w-full flex items-center justify-between space-x-3 text-left">
                                        <div className="flex items-center space-x-3">
                                            <link.Icon className="w-5 h-5 flex-shrink-0" />
                                            <span>{t(link.labelKey)}</span>
                                        </div>
                                        <svg className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isOpen && (
                                        <div className="pl-6 mt-1 space-y-0.5">
                                            {link.subItems.map(subItem => (
                                                <NavLink key={subItem.to} to={subItem.to} className={({ isActive }) => getSubNavLinkClass(isActive)}>
                                                    <subItem.Icon className="w-4 h-4 flex-shrink-0" />
                                                    <span>{t(subItem.labelKey)}</span>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        // RENDER NORMAL LINK
                        return (
                            <NavLink key={link.to} to={link.to} className={({ isActive }) => getNavLinkClass(isActive)}>
                                <link.Icon className="w-5 h-5 flex-shrink-0" />
                                <span>{t(link.labelKey)}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;