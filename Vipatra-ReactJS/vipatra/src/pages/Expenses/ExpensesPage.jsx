// src/pages/Expenses/ExpensesPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

// Dummy data for customers (replace with actual data fetching or context)
const dummyCustomers = [
    { id: "client1", name: "Wellness Clinic Pvt. Ltd." },
    { id: "client2", name: "Rohan Sharma" },
    { id: "client3", name: "Tech Solutions Inc." },
];


const ExpensesPage = () => {
    const { t } = useTranslation();
    const [showRecordForm, setShowRecordForm] = useState(false);

    // --- State for New Expense Form ---
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0,10));
    const [expenseCategory, setExpenseCategory] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isReimbursable, setIsReimbursable] = useState(false);
    const [linkedClient, setLinkedClient] = useState('');
    const [linkedProject, setLinkedProject] = useState('');

    const expenseFileInputRef = useRef(null);

    const handleShowRecordForm = () => setShowRecordForm(true);
    const resetFormFields = () => {
        setExpenseDate(new Date().toISOString().slice(0,10));
        setExpenseCategory('');
        setVendorName('');
        setExpenseAmount('');
        setExpenseDescription('');
        setSelectedFiles([]);
        setIsReimbursable(false);
        setLinkedClient('');
        setLinkedProject('');
        if(expenseFileInputRef.current) expenseFileInputRef.current.value = "";
    };
    const handleHideRecordForm = () => {
        setShowRecordForm(false);
        resetFormFields();
    };

    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };
    const handleDrop = (event) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-primary');
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            setSelectedFiles(Array.from(event.dataTransfer.files));
            event.dataTransfer.clearData();
        }
    };
    const handleDragOver = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add('border-primary');
    };
    const handleDragLeave = (event) => {
        event.currentTarget.classList.remove('border-primary');
    };

    const handleNewExpenseSubmit = (e) => {
        e.preventDefault();
        const newExpenseData = {
            date: expenseDate,
            category: expenseCategory,
            vendor: vendorName,
            amount: expenseAmount,
            description: expenseDescription,
            isReimbursable,
            client: isReimbursable ? linkedClient : null,
            project: isReimbursable ? linkedProject : null,
            files: selectedFiles.map(f => f.name),
        };
        console.log("New Expense Data:", newExpenseData);
        alert(t('expenses.newExpenseForm.expenseSavedMsg'));
        handleHideRecordForm();
    };

    // Expense categories for the dropdown
    const expenseCategories = [
        { value: "office_supplies", labelKey: "expenses.newExpenseForm.categories.officeSupplies" },
        { value: "rent_utilities", labelKey: "expenses.newExpenseForm.categories.rentUtilities" },
        { value: "travel", labelKey: "expenses.newExpenseForm.categories.travel" },
        { value: "software_subscriptions", labelKey: "expenses.newExpenseForm.categories.softwareSubscriptions" },
        { value: "marketing", labelKey: "expenses.newExpenseForm.categories.marketing" },
        { value: "vendor_payment", labelKey: "expenses.newExpenseForm.categories.vendorPayment" },
        { value: "other", labelKey: "expenses.newExpenseForm.categories.other" },
    ];


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> {/* Ensure "Expenses" is active here */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h2 className="text-3xl font-heading text-primary">{t('expenses.manageTitle')}</h2>
                            <p className="text-secondary font-sans mt-1">{t('expenses.manageSubtitle')}</p>
                        </div>
                        {!showRecordForm && (
                            <button
                                id="showRecordExpenseFormBtn"
                                onClick={handleShowRecordForm}
                                className="mt-4 sm:mt-0 font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{t('expenses.recordNewExpenseBtn')}</span>
                            </button>
                        )}
                    </div>

                    {/* Initial View / Expense List Placeholder */}
                    {!showRecordForm && (
                        <div id="expenseInitialView" className="dashboard-card">
                            <div className="text-center py-10">
                                <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5-2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM16.5 13.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM21 14H3M21 10H3m5-7h6a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"></path></svg>
                                <h3 className="text-lg font-heading text-primary">{t('expenses.initialView.title')}</h3>
                                <p className="text-sm text-secondary font-sans">{t('expenses.initialView.subtitle')}</p>
                                <div className="mt-6 border border-borderDefault rounded-lg p-4 text-left">
                                    <p className="text-center text-secondary">{t('expenses.initialView.tablePlaceholder')}</p>
                                    {/* Actual expense table would go here */}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Record New Expense Form */}
                    {showRecordForm && (
                        <div id="recordExpenseFormContainer" className="mt-0">
                            <section className="dashboard-card">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-heading text-primary">{t('expenses.newExpenseForm.title')}</h3>
                                    <button id="hideRecordExpenseFormBtn" onClick={handleHideRecordForm} className="text-secondary hover:text-danger-DEFAULT transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>

                                <form id="newExpenseForm" onSubmit={handleNewExpenseSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="expenseDate" className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.newExpenseForm.expenseDateLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                        <input type="date" id="expenseDate" name="expenseDate" value={expenseDate} onChange={e => setExpenseDate(e.target.value)} className="form-element" required />
                                    </div>

                                    <div>
                                        <label htmlFor="expenseCategory" className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.newExpenseForm.categoryLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                        <select id="expenseCategory" name="expenseCategory" value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)} className="form-element" required>
                                            <option value="" disabled>{t('expenses.newExpenseForm.selectCategoryOption')}</option>
                                            {expenseCategories.map(cat => (
                                                <option key={cat.value} value={cat.value}>{t(cat.labelKey)}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="vendorName" className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.newExpenseForm.vendorNameLabel')}</label>
                                        <input type="text" id="vendorName" name="vendorName" value={vendorName} onChange={e => setVendorName(e.target.value)} placeholder={t('expenses.newExpenseForm.vendorNamePlaceholder')} className="form-element" />
                                    </div>

                                    <div>
                                        <label htmlFor="expenseAmount" className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.newExpenseForm.amountLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                        <input type="number" id="expenseAmount" name="expenseAmount" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required />
                                    </div>

                                    <div>
                                        <label htmlFor="expenseDescription" className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.newExpenseForm.descriptionLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                        <textarea id="expenseDescription" name="expenseDescription" value={expenseDescription} onChange={e => setExpenseDescription(e.target.value)} rows="3" placeholder={t('expenses.newExpenseForm.descriptionPlaceholder')} className="form-element" required></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.newExpenseForm.attachReceiptLabel')}</label>
                                        <div className="file-input-area" id="expenseDropzone" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-10 w-10 text-secondary" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                <div className="flex text-sm text-secondary justify-center">
                                                    <label htmlFor="expense-file-upload" className="relative cursor-pointer bg-cardBg rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent px-1">
                                                        <span>{t('expenses.newExpenseForm.uploadFile')}</span>
                                                        <input id="expense-file-upload" name="expense-files[]" type="file" className="sr-only" multiple onChange={handleFileChange} ref={expenseFileInputRef}/>
                                                    </label>
                                                    <p className="pl-1">{t('expenses.newExpenseForm.dragAndDrop')}</p>
                                                </div>
                                                <p className="text-xs text-secondary">{t('expenses.newExpenseForm.maxFileSize')}</p>
                                            </div>
                                        </div>
                                        <div id="expense-file-list" className="mt-2 text-sm text-secondary">
                                            {selectedFiles.length > 0 ? selectedFiles.map(file => file.name).join(', ') : t('expenses.newExpenseForm.noFileChosen')}
                                        </div>
                                    </div>

                                    <fieldset className="pt-2 border-t border-borderLight mt-6">
                                        <legend className="text-md font-heading text-primary mb-2 -mt-5 px-2 bg-cardBg inline-block">{t('expenses.newExpenseForm.reimbursableLegend')}</legend>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <input id="isReimbursable" name="isReimbursable" type="checkbox" checked={isReimbursable} onChange={e => setIsReimbursable(e.target.checked)} className="h-4 w-4 text-primary border-gray-400 rounded focus:ring-primary" />
                                                <label htmlFor="isReimbursable" className="ml-2 block text-sm font-medium text-primary font-sans">{t('expenses.newExpenseForm.isReimbursableLabel')}</label>
                                            </div>
                                            {isReimbursable && (
                                                <div id="linkToClientProject" className="space-y-3 pl-6">
                                                    <div>
                                                        <label htmlFor="linkClient" className="block text-xs font-medium text-primary mb-1 font-sans">{t('expenses.newExpenseForm.linkToClientLabel')}</label>
                                                        <select id="linkClient" name="linkClient" value={linkedClient} onChange={e => setLinkedClient(e.target.value)} className="form-element !p-2 text-sm">
                                                            <option value="">{t('expenses.newExpenseForm.selectCustomerOption')}</option>
                                                            {dummyCustomers.map(customer => (
                                                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="linkProject" className="block text-xs font-medium text-primary mb-1 font-sans">{t('expenses.newExpenseForm.linkToProjectLabel')}</label>
                                                        <input type="text" id="linkProject" name="linkProject" value={linkedProject} onChange={e => setLinkedProject(e.target.value)} placeholder={t('expenses.newExpenseForm.linkToProjectPlaceholder')} className="form-element !p-2 text-sm" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </fieldset>

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button type="button" onClick={handleHideRecordForm} className="font-sans bg-background hover:bg-borderLight text-secondary px-6 py-3 rounded-lg shadow-sm border border-borderDefault transition-colors">{t('common.cancel')}</button>
                                        <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">{t('expenses.newExpenseForm.saveExpenseBtn')}</button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ExpensesPage;