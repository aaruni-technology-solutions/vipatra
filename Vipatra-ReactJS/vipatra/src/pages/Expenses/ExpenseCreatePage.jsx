// src/pages/Expenses/ExpenseCreatePage.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Header, Sidebar, and Footer imports have been removed.

// =====================================================================
// SUB-COMPONENT 1: Record Expense Form
// This full component definition remains unchanged.
// =====================================================================
const RecordExpenseForm = ({ t, onSubmit }) => {
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0, 10));
    const [expenseCategory, setExpenseCategory] = useState('');
    const [itemize, setItemize] = useState(false);
    const [amount, setAmount] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [notes, setNotes] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [receipts, setReceipts] = useState([]);
    const expenseFileInputRef = useRef(null);

    const expenseCategories = [
        { value: "advertising", labelKey: "expenses.categories.advertising" },
        { value: "meals", labelKey: "expenses.categories.meals" },
        { value: "office_supplies", labelKey: "expenses.categories.officeSupplies" },
        { value: "travel", labelKey: "expenses.categories.travel" },
        { value: "other", labelKey: "expenses.categories.other" },
    ];

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ expenseDate, category: expenseCategory, itemize, amount, invoiceNo, notes, customerName, receipts });
    };

    const handleFileChange = (event) => setReceipts(Array.from(event.target.files));

    return (
        <section className="dashboard-card mt-6">
            <h3 className="text-2xl font-heading text-primary mb-6">{t('expenses.recordExpenseForm.title')}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="expenseDate" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.dateLabel')} <span className="text-danger-DEFAULT">*</span></label>
                        <input type="date" id="expenseDate" value={expenseDate} onChange={e => setExpenseDate(e.target.value)} className="form-element" required />
                    </div>
                    <div>
                        <label htmlFor="expenseCategory" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.categoryLabel')} <span className="text-danger-DEFAULT">*</span></label>
                        <select id="expenseCategory" value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)} className="form-element" required>
                            <option value="" disabled>{t('expenses.recordExpenseForm.selectCategoryOption')}</option>
                            {expenseCategories.map(cat => <option key={cat.value} value={cat.value}>{t(cat.labelKey)}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex items-center">
                    <input id="itemizeExpense" name="itemizeExpense" type="checkbox" checked={itemize} onChange={e => setItemize(e.target.checked)} className="h-4 w-4 text-primary border-gray-400 rounded focus:ring-primary"/>
                    <label htmlFor="itemizeExpense" className="ml-2 block text-sm font-medium text-primary font-sans">{t('expenses.recordExpenseForm.itemizeLabel')}</label>
                </div>
                 <div>
                    <label htmlFor="expenseAmount" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.amountLabel')} <span className="text-danger-DEFAULT">*</span></label>
                    <input type="number" id="expenseAmount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required />
                </div>
                <div><label htmlFor="expenseInvoiceNo" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.invoiceNoLabel')}</label><input type="text" id="expenseInvoiceNo" value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} className="form-element"/></div>
                <div><label htmlFor="expenseNotes" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.notesLabel')}</label><textarea id="expenseNotes" value={notes} onChange={e=>setNotes(e.target.value)} rows="2" placeholder={t('expenses.recordExpenseForm.notesPlaceholder')} className="form-element"></textarea></div>
                <div><label htmlFor="expenseCustomerName" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.customerNameLabel')}</label><input type="text" id="expenseCustomerName" value={customerName} onChange={e=>setCustomerName(e.target.value)} className="form-element"/></div>
                <div>
                     <label className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.recordExpenseForm.attachReceiptLabel')}</label>
                    <input type="file" multiple onChange={handleFileChange} ref={expenseFileInputRef} className="form-element file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                    {receipts.length > 0 && <div className="mt-2 text-xs text-secondary">{receipts.map(f => f.name).join(', ')}</div>}
                </div>
                <div className="flex justify-end pt-4"><button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft">{t('expenses.recordExpenseForm.saveExpenseBtn')}</button></div>
            </form>
        </section>
    );
};

// =====================================================================
// SUB-COMPONENT 2: Record Mileage Form
// This full component definition remains unchanged.
// =====================================================================
const RecordMileageForm = ({ t, onSubmit }) => {
    const [mileageDate, setMileageDate] = useState(new Date().toISOString().slice(0, 10));
    const [employee, setEmployee] = useState('');
    const [calculationMode, setCalculationMode] = useState('distance');
    const [distance, setDistance] = useState('');
    const [startOdometer, setStartOdometer] = useState('');
    const [endOdometer, setEndOdometer] = useState('');
    const [mileageUnit, setMileageUnit] = useState('km');
    const [amount, setAmount] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [notes, setNotes] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [receipts, setReceipts] = useState([]);
    const mileageFileInputRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ mileageDate, employee, calculationMode, distance: calculationMode === 'distance' ? distance : null, startOdometer: calculationMode === 'odometer' ? startOdometer : null, endOdometer: calculationMode === 'odometer' ? endOdometer : null, unit: mileageUnit, amount, invoiceNo, notes, customerName, receipts });
    };

    const handleFileChange = (event) => setReceipts(Array.from(event.target.files));

    return (
        <section className="dashboard-card mt-6">
            <h3 className="text-2xl font-heading text-primary mb-6">{t('expenses.recordMileageForm.title')}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label htmlFor="mileageDate" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.dateLabel')} <span className="text-danger-DEFAULT">*</span></label><input type="date" id="mileageDate" value={mileageDate} onChange={e=>setMileageDate(e.target.value)} className="form-element" required /></div>
                    <div><label htmlFor="mileageEmployee" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.employeeLabel')}</label><input type="text" id="mileageEmployee" value={employee} onChange={e=>setEmployee(e.target.value)} className="form-element"/></div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">{t('expenses.recordMileageForm.calculateUsingLabel')}</label>
                    <div className="flex space-x-4">
                        <div className="type-option"><input type="radio" id="calcDistance" name="calculationMode" value="distance" checked={calculationMode === 'distance'} onChange={e=>setCalculationMode(e.target.value)}/><label htmlFor="calcDistance">{t('expenses.recordMileageForm.distanceTravelled')}</label></div>
                        <div className="type-option"><input type="radio" id="calcOdometer" name="calculationMode" value="odometer" checked={calculationMode === 'odometer'} onChange={e=>setCalculationMode(e.target.value)}/><label htmlFor="calcOdometer">{t('expenses.recordMileageForm.odometerReading')}</label></div>
                    </div>
                </div>
                {calculationMode === 'distance' && (
                    <div><label htmlFor="distanceTravelled" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.distanceLabel')}</label>
                        <div className="flex"><input type="number" id="distanceTravelled" value={distance} onChange={e=>setDistance(e.target.value)} className="form-element rounded-r-none" /><span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-400 bg-gray-50 text-secondary text-sm">{t(mileageUnit === 'km' ? 'expenses.recordMileageForm.unitKilometers' : 'expenses.recordMileageForm.unitMiles')}</span></div>
                    </div>
                )}
                {calculationMode === 'odometer' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label htmlFor="startOdometer" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.startOdometerLabel')}</label><input type="number" id="startOdometer" value={startOdometer} onChange={e=>setStartOdometer(e.target.value)} className="form-element"/></div>
                        <div><label htmlFor="endOdometer" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.endOdometerLabel')}</label><input type="number" id="endOdometer" value={endOdometer} onChange={e=>setEndOdometer(e.target.value)} className="form-element"/></div>
                    </div>
                )}
                 <div><label htmlFor="mileageAmount" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.amountLabel')} <span className="text-danger-DEFAULT">*</span></label><input type="number" id="mileageAmount" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required/></div>
                <div><label htmlFor="mileageInvoiceNo" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.invoiceNoLabel')}</label><input type="text" id="mileageInvoiceNo" value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} className="form-element"/></div>
                <div><label htmlFor="mileageNotes" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.notesLabel')}</label><textarea id="mileageNotes" value={notes} onChange={e=>setNotes(e.target.value)} rows="2" className="form-element"></textarea></div>
                <div><label htmlFor="mileageCustomerName" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.customerNameLabel')}</label><input type="text" id="mileageCustomerName" value={customerName} onChange={e=>setCustomerName(e.target.value)} className="form-element"/></div>
                 <div>
                     <label className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.recordExpenseForm.attachReceiptLabel')}</label>
                    <input type="file" multiple onChange={handleFileChange} ref={mileageFileInputRef} className="form-element file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                    {receipts.length > 0 && <div className="mt-2 text-xs text-secondary">{receipts.map(f => f.name).join(', ')}</div>}
                </div>
                <div className="flex justify-end pt-4"><button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft">{t('expenses.recordMileageForm.saveMileageBtn')}</button></div>
            </form>
        </section>
    );
};

// =====================================================================
// MAIN CREATE PAGE COMPONENT
// This renders the correct form based on the active tab.
// =====================================================================
const ExpenseCreatePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('expense');

    const handleSaveExpense = (data) => {
        console.log("Saving Expense:", data);
        alert(t('expenses.alertFormSubmitted'));
        navigate('/expenses');
    };

    const handleSaveMileage = (data) => {
        console.log("Saving Mileage:", data);
        alert(t('expenses.alertFormSubmitted'));
        navigate('/expenses');
    };

    return (
        // The main layout wrappers have been removed. 
        // The <main> tag is now the root element.
        <main className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start">
                <div>
                    <h2 className="text-3xl font-heading text-primary">{t('expenses.pageTitleCreate', 'Create Expense')}</h2>
                    <p className="text-secondary font-sans mt-1">{t('expenses.pageSubtitleCreate', 'Record a new business expense or mileage.')}</p>
                </div>
                <button
                    onClick={() => navigate('/expenses/preferences')}
                    className="mt-4 sm:mt-0 font-sans text-sm text-primary hover:text-accent underline transition-colors duration-200 flex items-center space-x-1 self-start sm:self-center"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>{t('expenses.mileagePreferencesLink')}</span>
                </button>
            </div>
            <div className="mb-6 border-b border-borderDefault flex space-x-1">
                <button
                    onClick={() => setActiveTab('expense')}
                    className={`py-2 px-4 font-sans text-sm font-medium border-b-2 transition-colors duration-150 ${activeTab === 'expense' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary hover:border-gray-300'}`}
                >
                    {t('expenses.tabExpense')}
                </button>
                <button
                    onClick={() => setActiveTab('mileage')}
                    className={`py-2 px-4 font-sans text-sm font-medium border-b-2 transition-colors duration-150 ${activeTab === 'mileage' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary hover:border-gray-300'}`}
                >
                    {t('expenses.tabMileage')}
                </button>
            </div>
            {activeTab === 'expense' && <RecordExpenseForm t={t} onSubmit={handleSaveExpense} />}
            {activeTab === 'mileage' && <RecordMileageForm t={t} onSubmit={handleSaveMileage} />}
        </main>
    );
};

export default ExpenseCreatePage;