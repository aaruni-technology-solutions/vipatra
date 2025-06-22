// src/pages/Customers/CustomerViewPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Dummy data for a single customer - replace with API call
const getDummyCustomerData = (customerId) => {
    if (customerId === "1") { // Corresponds to Wellness Clinic example
        return {
            id: "1",
            name: "Wellness Clinic Pvt. Ltd.",
            type: "business", // 'business' or 'individual'
            status: "Active",
            primaryContact: { name: "Mr. John Doe", title: "Director" },
            email: "contact@wellnessclinic.com",
            workPhone: "+91 80 1234 5678",
            address: "12 Health Ave, Wellness City, Karnataka 560001, India",
            gstin: "29ABCDE1234F1Z5",
            outstandingBalance: "12500.00",
            lifetimeValue: "175200.00",
            recentActivity: [
                { date: "May 20, 2024", descriptionKey: "customerView.overview.paymentReceivedActivity", params: { amount: "₹1,500", invoiceId: "INV-0075" } },
                { date: "May 10, 2024", descriptionKey: "customerView.overview.invoiceSentActivity", params: { invoiceId: "INV-0078", amount: "₹3,500" } },
                { date: "Apr 28, 2024", descriptionKey: "customerView.overview.portalAccessEnabledActivity" },
            ],
            invoices: [
                { id: "INV-0078", issueDate: "May 10, 2024", dueDate: "May 25, 2024", amount: "3,500.00", status: "Partially Paid", statusClass: "status-partial" },
                { id: "INV-0075", issueDate: "Apr 15, 2024", dueDate: "Apr 30, 2024", amount: "1,500.00", status: "Paid", statusClass: "status-paid" },
            ],
            payments: [
                { id: 1, date: "May 20, 2024", invoiceId: "INV-0075", amount: "1,500.00", method: "UPI" },
            ],
            communicationPreferences: { // Dummy data for preferences
                sendInvoicesEmail: true,
                sendInvoiceSms: false,
                emailDueReminders: true,
                emailOverdueReminders: true,
                smsReminders: false,
                newsletter: false,
                promotions: true,
                preferredLanguage: 'en'
            },
            notes: "This is an important client. Follow up quarterly." // Internal notes
        };
    }
    return null; // Or some default customer
};

const CustomerViewPage = () => {
    const { t, i18n } = useTranslation();
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [commPrefs, setCommPrefs] = useState({});
    const [internalNote, setInternalNote] = useState('');


    useEffect(() => {
        // In a real app, fetch customer data from API using customerId
        console.log("Fetching customer for ID:", customerId);
        const data = getDummyCustomerData(customerId);
        if (data) {
            setCustomer(data);
            setCommPrefs(data.communicationPreferences || {});
            setInternalNote(data.notes || '');
        } else {
            // Handle customer not found, e.g., redirect to a 404 page or customer list
            // navigate('/customers'); // Or navigate('/404');
        }
    }, [customerId, navigate]);

    const handleCommPrefsChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCommPrefs(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveCommPrefs = (e) => {
        e.preventDefault();
        console.log("Saving communication preferences:", commPrefs);
        alert(t('common.preferencesSaved', "Preferences Saved!"));
        // API call to save preferences
    };
     const handleSaveNote = (e) => {
        e.preventDefault();
        console.log("Saving note:", internalNote);
        alert(t('common.noteSaved', "Note Saved!"));
        // API call to save note
    };


    if (!customer) {
        return (
            <div className="flex min-h-screen items-center justify-center"><p>{t('common.loading', 'Loading customer details...')}</p></div>
        );
    }

    const tabs = [
        { id: 'overview', labelKey: 'customerView.tabs.overview' },
        { id: 'invoices', labelKey: 'customerView.tabs.invoices' },
        { id: 'payments', labelKey: 'customerView.tabs.payments' },
        { id: 'commPrefs', labelKey: 'customerView.tabs.communication' },
        { id: 'statements', labelKey: 'customerView.tabs.statements' },
        { id: 'notes', labelKey: 'customerView.tabs.notes' },
    ];

    const customerTypeDisplay = customer.type === 'business' ? t('common.business') : t('common.individual');
    const customerStatusDisplay = customer.status === 'Active' ? t('common.active') : t('common.inactive');

    return (
        <main className="p-6 sm:p-8">
            {/* Customer Header & Main Actions */}
            <section className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <Link to="/customers" className="text-sm text-secondary hover:text-primary font-sans mb-1 inline-flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        {t('customerView.backLink')}
                    </Link>
                    <h2 className="text-3xl font-heading text-primary mt-1">{customer.name}</h2>
                    <p className="text-secondary font-sans">{t('customerView.customerTypeAndStatus', { type: customerTypeDisplay, status: customerStatusDisplay })}</p>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                    <Link to={`/invoices/new?customerId=${customer.id}`} className="font-sans text-sm bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2 rounded-lg shadow-soft flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{t('customerView.actions.newInvoice')}</span>
                    </Link>
                    {/* Record Payment button could open a modal or navigate */}
                    <button className="font-sans text-sm bg-accent hover:bg-accent-dark text-textDark px-4 py-2 rounded-lg shadow-soft flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        <span>{t('customerView.actions.recordPayment')}</span>
                    </button>
                    <Link to={`/customers/edit/${customer.id}`} className="font-sans text-sm bg-cardBg border border-borderDefault hover:border-primary text-secondary hover:text-primary px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        <span>{t('customerView.actions.editCustomer')}</span>
                    </Link>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="border-b border-borderDefault mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`tab-link ${activeTab === tab.id ? 'tab-link-active' : 'tab-link-inactive'}`}
                        >
                            {t(tab.labelKey)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content Area */}
            <div>
                {activeTab === 'overview' && (
                    <div id="overviewContent" className="tab-content">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 dashboard-card">
                                <h3 className="text-xl font-heading text-primary mb-4">{t('customerView.overview.contactInfoTitle')}</h3>
                                <dl className="font-sans text-sm space-y-3">
                                    {customer.primaryContact && <div className="grid grid-cols-3 gap-2"><dt className="text-secondary">{t('customerView.overview.primaryContactLabel')}</dt><dd className="col-span-2 text-primary">{customer.primaryContact.name} {customer.primaryContact.title && `(${customer.primaryContact.title})`}</dd></div>}
                                    <div className="grid grid-cols-3 gap-2"><dt className="text-secondary">{t('customerView.overview.emailLabel')}</dt><dd className="col-span-2 text-primary">{customer.email}</dd></div>
                                    {customer.workPhone && <div className="grid grid-cols-3 gap-2"><dt className="text-secondary">{t('customerView.overview.workPhoneLabel')}</dt><dd className="col-span-2 text-primary">{customer.workPhone}</dd></div>}
                                    {customer.address && <div className="grid grid-cols-3 gap-2"><dt className="text-secondary">{t('customerView.overview.addressLabel')}</dt><dd className="col-span-2 text-primary">{customer.address}</dd></div>}
                                    {customer.gstin && <div className="grid grid-cols-3 gap-2"><dt className="text-secondary">{t('customerView.overview.gstinLabel')}</dt><dd className="col-span-2 text-primary">{customer.gstin}</dd></div>}
                                </dl>
                            </div>
                            <div className="lg:col-span-1 space-y-6">
                                <div className="dashboard-card text-center"><p className="text-sm text-secondary font-sans uppercase">{t('customerView.overview.outstandingBalanceTitle')}</p><p className="text-3xl font-bold font-sans text-danger-DEFAULT mt-1">₹{customer.outstandingBalance}</p></div>
                                <div className="dashboard-card text-center"><p className="text-sm text-secondary font-sans uppercase">{t('customerView.overview.lifetimeValueTitle')}</p><p className="text-3xl font-bold font-sans text-primary mt-1">₹{customer.lifetimeValue}</p></div>
                            </div>
                        </div>
                        <div className="dashboard-card mt-6">
                            <h3 className="text-xl font-heading text-primary mb-4">{t('customerView.overview.recentActivityTitle')}</h3>
                            <ul className="font-sans text-sm space-y-2">
                                {customer.recentActivity.map((activity, index) => (
                                    <li key={index} className="text-secondary"><span className="text-primary font-medium">{activity.date}:</span> {t(activity.descriptionKey, activity.params)}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'invoices' && (
                    <div id="invoicesContent" className="tab-content">
                        <div className="dashboard-card">
                            <h3 className="text-xl font-heading text-primary mb-4">{t('customerView.invoicesTab.title', { customerName: customer.name })}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px] text-sm font-sans">
                                    <thead className="bg-background"><tr className="border-b border-borderDefault"><th className="p-2 text-left">{t('customerView.invoicesTab.table.invoiceNo')}</th><th className="p-2 text-left">{t('customerView.invoicesTab.table.issueDate')}</th><th className="p-2 text-left">{t('customerView.invoicesTab.table.dueDate')}</th><th className="p-2 text-right">{t('customerView.invoicesTab.table.amount')}</th><th className="p-2 text-center">{t('customerView.invoicesTab.table.status')}</th></tr></thead>
                                    <tbody>
                                        {customer.invoices.map(inv => (
                                            <tr key={inv.id} className="border-b border-borderLight"><td className="p-2"><Link to={`/invoices/${inv.id}`} className="text-primary hover:underline">{inv.id}</Link></td><td className="p-2">{inv.issueDate}</td><td className="p-2">{inv.dueDate}</td><td className="p-2 text-right">₹{inv.amount}</td><td className="p-2 text-center"><span className={`status-badge ${inv.statusClass}`}>{t(`status.${inv.status.toLowerCase().replace(/\s+/g, '')}`, inv.status)}</span></td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'payments' && (
                    <div id="paymentsContent" className="tab-content">
                       <div className="dashboard-card">
                            <h3 className="text-xl font-heading text-primary mb-4">{t('customerView.paymentsTab.title', { customerName: customer.name })}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[500px] text-sm font-sans">
                                    <thead className="bg-background"><tr className="border-b border-borderDefault"><th className="p-2 text-left">{t('customerView.paymentsTab.table.date')}</th><th className="p-2 text-left">{t('customerView.paymentsTab.table.invoiceNo')}</th><th className="p-2 text-right">{t('customerView.paymentsTab.table.amount')}</th><th className="p-2 text-left">{t('customerView.paymentsTab.table.method')}</th></tr></thead>
                                    <tbody>
                                        {customer.payments.map(pay => (
                                            <tr key={pay.id} className="border-b border-borderLight"><td className="p-2">{pay.date}</td><td className="p-2"><Link to={`/invoices/${pay.invoiceId}`} className="text-primary hover:underline">{pay.invoiceId}</Link></td><td className="p-2 text-right">₹{pay.amount}</td><td className="p-2">{pay.method}</td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'commPrefs' && (
                    <div id="commPrefsContent" className="tab-content">
                        <section className="dashboard-card">
                            <h3 className="text-xl font-heading text-primary mb-4">{t('customerView.communicationPrefs.title')}</h3>
                            <p className="text-sm text-secondary font-sans mb-6">{t('customerView.communicationPrefs.subtitle')}</p>
                            <form onSubmit={handleSaveCommPrefs} className="space-y-8">
                                <fieldset><legend className="text-lg font-heading text-primary mb-3 pb-2 border-b border-borderLight">{t('customerView.communicationPrefs.invoiceNotificationsLegend')}</legend><div className="space-y-4"><div className="flex items-start space-x-3"><input id="commInvoiceEmail" name="sendInvoicesEmail" type="checkbox" checked={commPrefs.sendInvoicesEmail || false} onChange={handleCommPrefsChange} className="mt-1 h-5 w-5 text-primary border-gray-400 rounded focus:ring-primary" /><div><label htmlFor="commInvoiceEmail" className="font-medium text-primary font-sans">{t('customerView.communicationPrefs.sendInvoicesEmailLabel')}</label><p className="text-xs text-secondary font-sans">{t('customerView.communicationPrefs.sendInvoicesEmailDesc')}</p></div></div> {/* ... more checkboxes ... */}</div></fieldset>
                                <fieldset><legend className="text-lg font-heading text-primary mb-3 pb-2 border-b border-borderLight">{t('customerView.communicationPrefs.paymentRemindersLegend')}</legend>{/* ... more checkboxes ... */}</fieldset>
                                <fieldset><legend className="text-lg font-heading text-primary mb-3 pb-2 border-b border-borderLight">{t('customerView.communicationPrefs.generalCommsLegend')}</legend>{/* ... more checkboxes ... */}</fieldset>
                                <div><label htmlFor="preferredLanguage" className="block text-sm font-medium text-primary mb-1 font-sans">{t('customerView.communicationPrefs.preferredLanguageLabel')}</label><select id="preferredLanguage" name="preferredLanguage" value={commPrefs.preferredLanguage || 'en'} onChange={handleCommPrefsChange} className="form-element w-full sm:w-1/2 md:w-1/3"><option value="en">English</option><option value="hi">Hindi (हिन्दी)</option><option value="kn">Kannada (ಕನ್ನಡ)</option></select><p className="text-xs text-secondary font-sans mt-1">{t('customerView.communicationPrefs.preferredLanguageDesc')}</p></div>
                                <div className="pt-6 border-t border-borderLight flex justify-end"><button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">{t('customerView.communicationPrefs.savePrefsBtn')}</button></div>
                            </form>
                        </section>
                    </div>
                )}
                 {activeTab === 'statements' && (<div id="statementsContent" className="tab-content"><div className="dashboard-card"><h3 className="text-xl font-heading text-primary">{t('customerView.statementsTab.title')}</h3><p className="text-secondary">{t('customerView.statementsTab.placeholder')}</p></div></div>)}
                 {activeTab === 'notes' && (<div id="notesContent" className="tab-content"><div className="dashboard-card"><h3 className="text-xl font-heading text-primary">{t('customerView.notesTab.title')}</h3><textarea className="form-element" rows="4" value={internalNote} onChange={(e) => setInternalNote(e.target.value)} placeholder={t('customerView.notesTab.placeholder')}></textarea><div className="text-right mt-3"><button onClick={handleSaveNote} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2 rounded-lg text-sm">{t('customerView.notesTab.saveNoteBtn')}</button></div></div></div>)}
            </div>
        </main>
    );
};

export default CustomerViewPage;