// src/pages/Customers/CustomersPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header'; // Assuming these exist
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';


// --- New Customer Form Component (Refactored to use CSS classes for grid) ---
const NewCustomerForm = ({ onSave, onCancel, t }) => {
    // All your existing state from the form remains here...
    const [customerType, setCustomerType] = useState('business');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // ...etc

    const handleSubmit = (e) => {
        e.preventDefault();
        // Your existing submit logic...
        const newCustomerData = {
            type: customerType,
            // ... all other data
        };
        onSave(newCustomerData);
    };

    return (
        <section className="dashboard-card max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-heading text-primary">{t('customers.newCustomerForm.title')}</h3>
                <button onClick={onCancel} className="text-secondary hover:text-danger-DEFAULT transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            {/* The form now uses the class defined in the parent's style block */}
            <form onSubmit={handleSubmit} className="customer-form-grid">
                 {/* This JSX is a simplified version of your form to show the grid structure */}
                <div className="form-group-type">
                    <label className="block text-sm font-medium text-primary mb-2 font-sans">{t('customers.newCustomerForm.customerTypeLabel')}</label>
                    <div className="flex space-x-4">
                        <div className="radio-option flex-1"><input type="radio" id="typeBusiness" name="customerType" value="business" checked={customerType === 'business'} onChange={(e) => setCustomerType(e.target.value)} /><label htmlFor="typeBusiness">{t('customers.initialView.businessType')}</label></div>
                        <div className="radio-option flex-1"><input type="radio" id="typeIndividual" name="customerType" value="individual" checked={customerType === 'individual'} onChange={(e) => setCustomerType(e.target.value)} /><label htmlFor="typeIndividual">{t('customers.initialView.individualType')}</label></div>
                    </div>
                </div>

                <fieldset className="form-group-primary-contact">
                    <legend className="text-lg font-heading text-primary mb-3">{t('customers.newCustomerForm.primaryContactLegend')}</legend>
                    {/* ... first name, last name inputs ... */}
                </fieldset>

                <fieldset className="form-group-company-details">
                     <legend className="text-lg font-heading text-primary mb-3">{t('customers.newCustomerForm.companyDetailsLegend', 'Company Details')}</legend>
                     {/* ... company name, display name inputs ... */}
                </fieldset>
                
                <div className="form-group-actions">
                     <button type="button" onClick={onCancel} className="font-sans bg-background hover:bg-borderLight text-secondary px-6 py-3 rounded-lg shadow-sm border border-borderDefault transition-colors">{t('common.cancel')}</button>
                     <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">{t('customers.newCustomerForm.saveBtn')}</button>
                </div>
            </form>
        </section>
    );
};


// --- Main Customers Page Component (The one you want to update) ---
const CustomersPage = () => {
    const { t } = useTranslation();
    
    // State management
    const [customers, setCustomers] = useState([]); // Start with empty for initial view
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
    const actionMenuRef = useRef(null);
    
    // --- Close dropdown when clicking outside ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
                setIsActionMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSaveCustomer = (newCustomerData) => {
        console.log("New Customer to save:", newCustomerData);
        setCustomers(prev => [...prev, { ...newCustomerData, id: Date.now(), outstanding: "0.00", status: "Active" }]);
        setShowCreateForm(false);
    };
    
   
    const pageStyles = `
        .page-layout {
            display: grid;
            grid-template-rows: auto 1fr;
            grid-template-areas:
                "action-bar"
                "content-area";
            gap: 1.5rem;
        }

        .action-bar {
            grid-area: action-bar;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .action-bar__left, .action-bar__right {
            display: flex;
            align-items: center;
            gap: 0.75rem; /* 12px */
        }

        
        .action-menu-container {
            position: relative;
        }
        .action-menu {
            position: absolute;
            right: 0;
            top: calc(100% + 0.5rem);
            width: 220px;
            background-color: white;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            z-index: 50;
            overflow: hidden;
            transform-origin: top right;
            transition: transform 0.1s ease-out, opacity 0.1s ease-out;
        }
        .action-menu.hidden {
            transform: scale(0.95);
            opacity: 0;
            pointer-events: none;
        }
        .action-menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.625rem 1rem; /* 10px 16px */
            font-size: 0.875rem;
            color: #374151; /* gray-700 */
            cursor: pointer;
            transition: background-color 0.15s ease;
        }
        .action-menu-item:hover {
            background-color: #f3f4f6;
        }
        .action-menu-item.highlight {
            background-color: #dbeafe; 
            color: #1e40af; 
            font-weight: 500;
        }
        .action-menu-item svg {
            width: 1rem;
            height: 1rem;
            margin-right: 0.75rem;
        }
        hr.action-menu-divider {
            border-top: 1px solid #e5e7eb;
            margin: 0.25rem 0;
        }
        
        /* ==== 4. MAIN CONTENT AREA ==== */
        .content-area {
            grid-area: content-area;
        }
        .content-area--empty-state {
            display: grid;
            place-items: center;
            height: 100%;
        }

        /* ==== 5. CUSTOMER FORM GRID ==== */
        .customer-form-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: 1fr;
            grid-template-areas:
                "type"
                "primary-contact"
                "company-details"
                "actions";
        }
        .form-group-type             { grid-area: type; }
        .form-group-primary-contact  { grid-area: primary-contact; }
        .form-group-company-details  { grid-area: company-details; }
        .form-group-actions          { grid-area: actions; display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; }

        @media (min-width: 768px) {
            .customer-form-grid {
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem 2rem;
                grid-template-areas:
                    "type type"
                    "primary-contact primary-contact"
                    "company-details company-details"
                    "actions actions";
            }  } `;

    return (
        <div className="flex flex-col min-h-screen">
            <style>{pageStyles}</style>
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="page-layout">

                        {/* ROW 1: THE ACTION BAR */}
                        <header className="action-bar">
                            <div className="action-bar__left">
                                <h2 className="text-xl font-semibold text-gray-800">All Customers</h2>
                                <svg className="w-5 h-5 text-gray-500 cursor-pointer" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </div>
                            <div className="action-bar__right">
                                <button onClick={() => setShowCreateForm(true)} className="bg-primary text-textOnPrimary font-semibold px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
                                    New
                                </button>
                                <div className="action-menu-container" ref={actionMenuRef}>
                                    <button onClick={() => setIsActionMenuOpen(prev => !prev)} className="p-2 rounded-md hover:bg-gray-100 border">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                                    </button>
                                    {/* The Action Dropdown Menu */}
                                    <div className={`action-menu ${!isActionMenuOpen ? 'hidden' : ''}`}>
                                        <div className="action-menu-item"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg> Sort by <span className="text-gray-400 ml-auto"></span></div>
                                        <hr className="action-menu-divider" />
                                        <div className="action-menu-item highlight"><svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg> Import Customers <span className="text-blue-600 ml-auto"></span></div>
                                        <div className="action-menu-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm6.293-10.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 9.414V13a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3z" clipRule="evenodd" /></svg> Export Customers <span className="text-gray-400 ml-auto"></span></div>
                                        <hr className="action-menu-divider" />
                                        <div className="action-menu-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg> Preferences</div>
                                        <div className="action-menu-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566z" clipRule="evenodd" /></svg> Refresh List</div>
                                    </div>
                                </div>
                                <button className="p-2 rounded-full bg-orange-400 text-white font-bold text-sm w-8 h-8 flex items-center justify-center hover:bg-orange-500">?</button>
                            </div>
                        </header>

                        {/* ROW 2: THE MAIN CONTENT */}
                        <div className={`content-area ${customers.length === 0 && !showCreateForm ? 'content-area--empty-state' : ''}`}>
                            {!showCreateForm ? (
                                <>
                                    {customers.length > 0 ? (
                                        <div className="dashboard-card">{/* YOUR CUSTOMER LIST/TABLE GOES HERE */}</div>
                                    ) : (
                                        <div className="text-center">
                                            <h3 className="text-2xl font-semibold text-gray-800">Business is no fun without people.</h3>
                                            <p className="text-gray-500 mt-2">Create and manage your contacts, all in one place.</p>
                                            <button onClick={() => setShowCreateForm(true)} className="mt-6 bg-primary text-textOnPrimary font-bold px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark transition-transform hover:scale-105">CREATE NEW CUSTOMER</button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <NewCustomerForm
                                    onSave={handleSaveCustomer}
                                    onCancel={() => setShowCreateForm(false)}
                                    t={t}
                                />
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default CustomersPage;