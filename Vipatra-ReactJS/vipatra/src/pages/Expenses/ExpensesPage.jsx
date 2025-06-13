// src/pages/Expenses/ExpensesPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Alert from '../../components/common/Alert';

// --- Mileage Preferences Component (can be a modal or a separate section) ---
const MileagePreferences = ({ t, onSave, onCancel }) => {
    const [defaultUnit, setDefaultUnit] = useState('km');
    const [mileageRates, setMileageRates] = useState([
        { id: 1, startDate: '', rate: '', isDefault: true } // Example default rate
    ]);

    const handleAddRate = () => {
        setMileageRates([...mileageRates, { id: Date.now(), startDate: '', rate: '', isDefault: false }]);
    };
    const handleRateChange = (index, field, value) => {
        const newRates = [...mileageRates];
        newRates[index][field] = value;
        setMileageRates(newRates);
    };
    const handleRemoveRate = (index) => {
        if (mileageRates.length > 1 || !mileageRates[index].isDefault) { // Prevent removing the only default
            setMileageRates(mileageRates.filter((_, i) => i !== index));
        }
    };
    const handleSavePreferences = () => {
        onSave({ defaultUnit, rates: mileageRates });
    };

    return (
        <div className="dashboard-card mt-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-heading text-primary">{t('expenses.mileagePreferences.title')}</h3>
                {onCancel && (
                    <button onClick={onCancel} className="text-secondary hover:text-danger-DEFAULT transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                )}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSavePreferences(); }} className="space-y-6">
                <div>
                    <label htmlFor="defaultMileageUnit" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('expenses.mileagePreferences.defaultUnitLabel')}</label>
                    <select id="defaultMileageUnit" value={defaultUnit} onChange={e => setDefaultUnit(e.target.value)} className="form-element">
                        <option value="km">{t('expenses.mileagePreferences.unitKm')}</option>
                        <option value="mile">{t('expenses.mileagePreferences.unitMile')}</option>
                    </select>
                </div>
                {/* Default Mileage Account - would need a list of accounts from Chart of Accounts */}
                <div>
                    <label htmlFor="defaultMileageAccount" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('expenses.mileagePreferences.defaultAccountLabel')}</label>
                    <select id="defaultMileageAccount" className="form-element">
                        <option value="">{t('expenses.mileagePreferences.selectAccountOption')}</option>
                        {/* Populate with accounts */}
                        <option value="travel_expense_acc">Travel Expense Account</option>
                    </select>
                </div>

                <fieldset className="mt-4">
                    <legend className="text-lg font-heading text-primary mb-2">{t('expenses.mileagePreferences.ratesTitle')}</legend>
                    <p className="text-xs text-secondary mb-4">{t('expenses.mileagePreferences.ratesDescription')}</p>
                    <div className="space-y-3">
                        {mileageRates.map((rateItem, index) => (
                            <div key={rateItem.id} className="grid grid-cols-12 gap-x-3 items-end p-3 bg-background rounded-lg">
                                <div className="col-span-5">
                                    <label htmlFor={`startDate-${index}`} className="block text-xs font-medium text-primary mb-0.5">{t('expenses.mileagePreferences.startDate')}</label>
                                    <input type="date" id={`startDate-${index}`} value={rateItem.startDate} disabled={rateItem.isDefault} onChange={e => handleRateChange(index, 'startDate', e.target.value)} className={`form-element-sm ${rateItem.isDefault ? 'bg-gray-100 cursor-not-allowed' : ''}`} placeholder={rateItem.isDefault ? 'Default Rate' : 'dd/MM/yyyy'} />
                                </div>
                                <div className="col-span-5">
                                    <label htmlFor={`rate-${index}`} className="block text-xs font-medium text-primary mb-0.5">{t('expenses.mileagePreferences.mileageRate')}</label>
                                    <input type="number" id={`rate-${index}`} value={rateItem.rate} onChange={e => handleRateChange(index, 'rate', e.target.value)} placeholder="0.00" step="0.01" className="form-element-sm" />
                                </div>
                                <div className="col-span-2 flex justify-end">
                                    {!rateItem.isDefault && (
                                        <button type="button" onClick={() => handleRemoveRate(index)} className="text-danger-DEFAULT hover:text-danger-dark p-1">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={handleAddRate} className="mt-4 font-sans text-sm bg-primary/80 hover:bg-primary text-textOnPrimary px-4 py-2 rounded-lg shadow-soft">
                        {t('expenses.mileagePreferences.addRateBtn')}
                    </button>
                </fieldset>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft">
                        {t('expenses.mileagePreferences.savePreferencesBtn')}
                    </button>
                </div>
            </form>
        </div>
    );
};


// --- Record Expense Form Component ---
const RecordExpenseForm = ({ t, onSubmit }) => {
    // State for this form
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().slice(0,10));
    const [expenseCategory, setExpenseCategory] = useState('');
    const [itemize, setItemize] = useState(false); // For itemizing expense
    const [amount, setAmount] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [notes, setNotes] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [receipts, setReceipts] = useState([]);
    const expenseFileInputRef = useRef(null);


    const expenseCategories = [ /* ... same as before ... */ ];

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ expenseDate, category: expenseCategory, itemize, amount, invoiceNo, notes, customerName, receipts });
    };

    // File handling (simplified)
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
                {/* Itemize (checkbox) - you can add logic to show item fields if checked */}
                <div className="flex items-center">
                    <input id="itemizeExpense" name="itemizeExpense" type="checkbox" checked={itemize} onChange={e => setItemize(e.target.checked)} className="h-4 w-4 text-primary border-gray-400 rounded focus:ring-primary"/>
                    <label htmlFor="itemizeExpense" className="ml-2 block text-sm font-medium text-primary font-sans">{t('expenses.recordExpenseForm.itemizeLabel')}</label>
                </div>
                 <div>
                    <label htmlFor="expenseAmount" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.amountLabel')} <span className="text-danger-DEFAULT">*</span></label>
                    <input type="number" id="expenseAmount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required />
                </div>
                {/* ... Other fields: Invoice#, Notes, Customer Name, Receipts ... */}
                <div><label htmlFor="expenseInvoiceNo" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.invoiceNoLabel')}</label><input type="text" id="expenseInvoiceNo" value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} className="form-element"/></div>
                <div><label htmlFor="expenseNotes" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.notesLabel')}</label><textarea id="expenseNotes" value={notes} onChange={e=>setNotes(e.target.value)} rows="2" placeholder={t('expenses.recordExpenseForm.notesPlaceholder')} className="form-element"></textarea></div>
                <div><label htmlFor="expenseCustomerName" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordExpenseForm.customerNameLabel')}</label><input type="text" id="expenseCustomerName" value={customerName} onChange={e=>setCustomerName(e.target.value)} className="form-element"/></div>
                <div> {/* File input */}
                     <label className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.recordExpenseForm.attachReceiptLabel')}</label>
                    {/* Simplified file input - use your existing styled one if preferred */}
                    <input type="file" multiple onChange={handleFileChange} ref={expenseFileInputRef} className="form-element file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                    {receipts.length > 0 && <div className="mt-2 text-xs text-secondary">{receipts.map(f => f.name).join(', ')}</div>}
                </div>

                <div className="flex justify-end pt-4"><button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft">{t('expenses.recordExpenseForm.saveExpenseBtn')}</button></div>
            </form>
        </section>
    );
};

// --- Record Mileage Form Component ---
const RecordMileageForm = ({ t, onSubmit }) => {
    // State for this form
    const [mileageDate, setMileageDate] = useState(new Date().toISOString().slice(0,10));
    const [employee, setEmployee] = useState('');
    const [calculationMode, setCalculationMode] = useState('distance'); // 'distance' or 'odometer'
    const [distance, setDistance] = useState('');
    const [startOdometer, setStartOdometer] = useState('');
    const [endOdometer, setEndOdometer] = useState('');
    const [mileageUnit, setMileageUnit] = useState('km'); // From preferences later
    const [amount, setAmount] = useState(''); // Could be auto-calculated
    const [invoiceNo, setInvoiceNo] = useState('');
    const [notes, setNotes] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [receipts, setReceipts] = useState([]);
    const mileageFileInputRef = useRef(null);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ mileageDate, employee, calculationMode, distance: calculationMode === 'distance' ? distance : null, startOdometer: calculationMode === 'odometer' ? startOdometer : null, endOdometer: calculationMode === 'odometer' ? endOdometer : null, unit: mileageUnit, amount, invoiceNo, notes, customerName, receipts });
    };

    // File handling (simplified)
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
                {/* ... Other fields: Amount, Invoice#, Notes, Customer Name, Receipts ... */}
                 <div><label htmlFor="mileageAmount" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.amountLabel')} <span className="text-danger-DEFAULT">*</span></label><input type="number" id="mileageAmount" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required/></div>
                <div><label htmlFor="mileageInvoiceNo" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.invoiceNoLabel')}</label><input type="text" id="mileageInvoiceNo" value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} className="form-element"/></div>
                <div><label htmlFor="mileageNotes" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.notesLabel')}</label><textarea id="mileageNotes" value={notes} onChange={e=>setNotes(e.target.value)} rows="2" className="form-element"></textarea></div>
                <div><label htmlFor="mileageCustomerName" className="block text-sm font-medium text-primary mb-1.5">{t('expenses.recordMileageForm.customerNameLabel')}</label><input type="text" id="mileageCustomerName" value={customerName} onChange={e=>setCustomerName(e.target.value)} className="form-element"/></div>
                 <div> {/* File input */}
                     <label className="block text-sm font-medium text-primary mb-1 font-sans">{t('expenses.recordExpenseForm.attachReceiptLabel')}</label>
                    <input type="file" multiple onChange={handleFileChange} ref={mileageFileInputRef} className="form-element file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                    {receipts.length > 0 && <div className="mt-2 text-xs text-secondary">{receipts.map(f => f.name).join(', ')}</div>}
                </div>


                <div className="flex justify-end pt-4"><button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft">{t('expenses.recordMileageForm.saveMileageBtn')}</button></div>
            </form>
        </section>
    );
};


// --- Main Expenses Page Component ---
const ExpensesPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('expense'); // 'expense', 'mileage', 'preferences'
    // In a real app, you'd fetch existing expenses/mileage logs
    // const [expensesList, setExpensesList] = useState([]);
    // const [mileageList, setMileageList] = useState([]);

    const handleSaveExpense = (data) => {
        console.log("Saving Expense:", data);
        alert(t('expenses.alertFormSubmitted'));
        // Add to expensesList, API call etc.
    };
    const handleSaveMileage = (data) => {
        console.log("Saving Mileage:", data);
        alert(t('expenses.alertFormSubmitted'));
        // Add to mileageList, API call etc.
    };
    const handleSaveMileagePrefs = (data) => {
        console.log("Saving Mileage Preferences:", data);
        alert(t('common.preferencesSaved', 'Preferences Saved!')); // Add to JSON
        setActiveTab('mileage'); // Go back to mileage tab or stay on prefs?
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> {/* Make sure "Expenses" link is active here */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-heading text-primary">{t('expenses.pageTitle')}</h2>
                            <p className="text-secondary font-sans mt-1">{t('expenses.pageSubtitle')}</p>
                        </div>
                        {activeTab !== 'preferences' && (
                             <button
                                onClick={() => setActiveTab('preferences')}
                                className="mt-4 sm:mt-0 font-sans text-sm text-primary hover:text-accent underline transition-colors duration-200 flex items-center space-x-1 self-start sm:self-center"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span>{t('expenses.mileagePreferencesLink')}</span>
                            </button>
                        )}
                    </div>

                    {/* Tabs for Expense / Mileage */}
                    {activeTab !== 'preferences' && (
                        <div className="mb-6 border-b border-borderDefault flex space-x-1">
                            <button
                                onClick={() => setActiveTab('expense')}
                                className={`py-2 px-4 font-sans text-sm font-medium border-b-2 transition-colors duration-150
                                    ${activeTab === 'expense' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary hover:border-gray-300'}`}
                            >
                                {t('expenses.tabExpense')}
                            </button>
                            <button
                                onClick={() => setActiveTab('mileage')}
                                className={`py-2 px-4 font-sans text-sm font-medium border-b-2 transition-colors duration-150
                                    ${activeTab === 'mileage' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary hover:border-gray-300'}`}
                            >
                                {t('expenses.tabMileage')}
                            </button>
                        </div>
                    )}


                    {/* Conditional Content Area */}
                    {activeTab === 'expense' && <RecordExpenseForm t={t} onSubmit={handleSaveExpense} />}
                    {activeTab === 'mileage' && <RecordMileageForm t={t} onSubmit={handleSaveMileage} />}
                    {activeTab === 'preferences' && <MileagePreferences t={t} onSave={handleSaveMileagePrefs} onCancel={() => setActiveTab('mileage')} />} {/* Pass onCancel to return to mileage for instance */}


                    {/* Placeholder for list of recent expenses/mileage if forms are not active */}
                    {activeTab !== 'preferences' && (
                        <div id="expenseInitialView" className="dashboard-card mt-8">
                            <div className="text-center py-10">
                                <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5-2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM16.5 13.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM21 14H3M21 10H3m5-7h6a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"></path></svg>
                                <h3 className="text-lg font-heading text-primary">{t('expenses.initialView.title')}</h3>
                                <p className="text-sm text-secondary font-sans">{t('expenses.initialView.subtitle')}</p>
                                <div className="mt-6 border border-borderDefault rounded-lg p-4 text-left">
                                    <p className="text-center text-secondary">{t('expenses.initialView.tablePlaceholder')}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ExpensesPage;