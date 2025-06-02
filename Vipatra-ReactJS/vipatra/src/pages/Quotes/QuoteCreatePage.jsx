// src/pages/Quotes/QuoteCreatePage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar'; // Adjust if you have a specific Quotes/Billing sidebar
import Footer from '../../components/layout/Footer';

const initialLineItem = { id: Date.now(), itemDetails: '', quantity: 1, rate: '', taxPercent: '' }; // Added taxPercent for items

const QuoteCreatePage = () => {
    const { t } = useTranslation();

    // --- Form State ---
    const [useSimplifiedView, setUseSimplifiedView] = useState(false); // Example toggle
    const [customerName, setCustomerName] = useState(''); // Would likely be an object {id, name} from a search
    const [quoteNo, setQuoteNo] = useState('QT-000001'); // Should be auto-generated or fetched
    const [referenceNo, setReferenceNo] = useState('');
    const [quoteDate, setQuoteDate] = useState(new Date().toISOString().slice(0, 10));
    const [expiryDate, setExpiryDate] = useState('');
    const [salesperson, setSalesperson] = useState(''); // Would be an object {id, name}
    const [projectName, setProjectName] = useState('');
    const [subject, setSubject] = useState('');
    const [lineItems, setLineItems] = useState([{ ...initialLineItem }]);
    const [customerNotes, setCustomerNotes] = useState(t('quotes.customerNotesPlaceholder'));
    const [termsConditions, setTermsConditions] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const fileInputRef = useRef(null);

    // Summary State
    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState('%'); // '%' or '₹' (or your currency symbol)
    const [tds, setTds] = useState(''); // Could be an object { type: 'TDS A', rate: 2 }
    const [tcs, setTcs] = useState(''); // Could be an object
    const [adjustment, setAdjustment] = useState(0);
    const [summaryTotals, setSummaryTotals] = useState({
        subTotal: 0,
        discountAmount: 0,
        tdsAmount: 0,
        tcsAmount: 0,
        grandTotal: 0,
    });

    // --- Handlers ---
    const handleLineItemChange = (index, field, value) => {
        const updatedItems = [...lineItems];
        updatedItems[index][field] = value;
        setLineItems(updatedItems);
    };

    const addLineItem = () => {
        setLineItems([...lineItems, { ...initialLineItem, id: Date.now() }]);
    };

    const removeLineItem = (index) => {
        if (lineItems.length > 0) { // Allow removing the last item for quotes unlike invoices
            const updatedItems = lineItems.filter((_, i) => i !== index);
            setLineItems(updatedItems);
        }
    };
    
    const handleFileChange = (event) => {
        // Limit to 3 files as an example
        const files = Array.from(event.target.files).slice(0, 3);
        setAttachedFiles(files);
    };


    // --- Calculation Logic (Simplified for UI Demo) ---
    const calculateTotals = useCallback(() => {
        let currentSubTotal = 0;
        lineItems.forEach(item => {
            const quantity = parseFloat(item.quantity) || 0;
            const rate = parseFloat(item.rate) || 0;
            currentSubTotal += quantity * rate;
        });

        let currentDiscountAmount = 0;
        const discountValue = parseFloat(discount) || 0;
        if (discountType === '%') {
            currentDiscountAmount = currentSubTotal * (discountValue / 100);
        } else {
            currentDiscountAmount = discountValue;
        }
        currentDiscountAmount = Math.min(currentDiscountAmount, currentSubTotal);


        // Placeholder for TDS/TCS calculation - this is complex and depends on rules
        const currentTdsAmount = parseFloat(tds) || 0; // This is a simplification
        const currentTcsAmount = parseFloat(tcs) || 0; // This is a simplification
        const currentAdjustment = parseFloat(adjustment) || 0;


        const currentGrandTotal = currentSubTotal - currentDiscountAmount - currentTdsAmount + currentTcsAmount + currentAdjustment;

        setSummaryTotals({
            subTotal: currentSubTotal.toFixed(2),
            discountAmount: currentDiscountAmount.toFixed(2),
            tdsAmount: currentTdsAmount.toFixed(2),
            tcsAmount: currentTcsAmount.toFixed(2),
            grandTotal: currentGrandTotal.toFixed(2),
        });
    }, [lineItems, discount, discountType, tds, tcs, adjustment]);

    useEffect(() => {
        calculateTotals();
    }, [calculateTotals]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const quoteData = {
            customerName, quoteNo, referenceNo, quoteDate, expiryDate, salesperson,
            projectName, subject, lineItems, customerNotes, termsConditions, attachedFiles,
            discount, discountType, tds, tcs, adjustment, summaryTotals, useSimplifiedView,
        };
        console.log("Quote Data:", quoteData);
        alert(t('common.formSubmitted', "Form Submitted (check console)")); // Add 'common.formSubmitted' key
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> {/* Make sure "New Quote" or "Billing" section is active */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h2 className="text-3xl font-heading text-primary">{t('quotes.pageTitle')}</h2>
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={useSimplifiedView}
                                    onChange={(e) => setUseSimplifiedView(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"
                                />
                                <span className="text-sm font-sans text-secondary">{t('quotes.useSimplifiedView')}</span>
                            </label>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* ----- Top Section: Customer, Quote Details ----- */}
                        <section className="dashboard-card">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="customerName" className="block text-sm font-medium text-primary mb-1">{t('quotes.customerNameLabel')}</label>
                                    <input type="text" id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder={t('quotes.customerNamePlaceholder')} className="form-element" />
                                </div>
                                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="quoteNo" className="block text-sm font-medium text-primary mb-1">{t('quotes.quoteNoLabel')}</label>
                                        <input type="text" id="quoteNo" value={quoteNo} onChange={e => setQuoteNo(e.target.value)} className="form-element bg-background" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="referenceNo" className="block text-sm font-medium text-primary mb-1">{t('quotes.referenceNoLabel')}</label>
                                        <input type="text" id="referenceNo" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} className="form-element" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <div>
                                    <label htmlFor="quoteDate" className="block text-sm font-medium text-primary mb-1">{t('quotes.quoteDateLabel')}</label>
                                    <input type="date" id="quoteDate" value={quoteDate} onChange={e => setQuoteDate(e.target.value)} className="form-element" />
                                </div>
                                <div>
                                    <label htmlFor="expiryDate" className="block text-sm font-medium text-primary mb-1">{t('quotes.expiryDateLabel')}</label>
                                    <input type="date" id="expiryDate" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder={t('quotes.expiryDatePlaceholder')} className="form-element" />
                                </div>
                                <div>
                                    <label htmlFor="salesperson" className="block text-sm font-medium text-primary mb-1">{t('quotes.salespersonLabel')}</label>
                                    <input type="text" id="salesperson" value={salesperson} onChange={e => setSalesperson(e.target.value)} placeholder={t('quotes.salespersonPlaceholder')} className="form-element" />
                                    {/* Replace with a Select dropdown if you have a list of salespeople */}
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label htmlFor="projectName" className="block text-sm font-medium text-primary mb-1">{t('quotes.projectNameLabel')}</label>
                                    <input type="text" id="projectName" value={projectName} onChange={e => setProjectName(e.target.value)} placeholder={t('quotes.projectNamePlaceholder')} className="form-element" disabled={!customerName} />
                                    {!customerName && <p className="text-xs text-secondary mt-1">{t('quotes.projectNameHelp')}</p>}
                                </div>
                                <div className="md:col-span-1">
                                      <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1">{t('quotes.subjectLabel')}</label>
                                      <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder={t('quotes.subjectPlaceholder')} className="form-element" />
                                </div>
                            </div>
                        </section>

                        {/* ----- Item Table ----- */}
                        <section className="dashboard-card">
                            <h3 className="text-lg font-heading text-primary mb-3">{t('quotes.itemTable.itemDetails')}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px]">
                                    <thead className="font-sans text-xs text-secondary uppercase">
                                        <tr>
                                            <th className="pb-2 text-left w-6">{/* Drag Handle Space */}</th>
                                            <th className="pb-2 text-left">{t('quotes.itemTable.itemDetails')}</th>
                                            <th className="pb-2 text-center w-24">{t('quotes.itemTable.quantity')}</th>
                                            <th className="pb-2 text-right w-32">{t('quotes.itemTable.rate')}</th>
                                            <th className="pb-2 text-right w-32">{t('quotes.itemTable.amount')}</th>
                                            <th className="pb-2 text-center w-10">{/* Remove Button Space */}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-sans">
                                        {lineItems.map((item, index) => (
                                            <tr key={item.id} className="item-row border-t border-borderLight">
                                                <td className="py-2 pr-2 text-gray-400 cursor-grab text-center">⠿</td>
                                                <td className="py-2 pr-2">
                                                    <input type="text" value={item.itemDetails} onChange={e => handleLineItemChange(index, 'itemDetails', e.target.value)} placeholder={t('common.searchOrType')} className="form-element !p-2 text-sm" />
                                                </td>
                                                <td className="py-2 px-1">
                                                    <input type="number" value={item.quantity} onChange={e => handleLineItemChange(index, 'quantity', e.target.value)} min="1" className="form-element !p-2 text-sm text-center" />
                                                </td>
                                                <td className="py-2 px-1">
                                                    <input type="number" value={item.rate} onChange={e => handleLineItemChange(index, 'rate', e.target.value)} placeholder="0.00" step="0.01" className="form-element !p-2 text-sm text-right" />
                                                </td>
                                                <td className="py-2 pl-1 text-right text-primary">
                                                    ₹{( (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0) ).toFixed(2)}
                                                </td>
                                                <td className="py-2 pl-2 text-center">
                                                    <button type="button" onClick={() => removeLineItem(index)} className="text-danger-DEFAULT hover:text-danger-dark p-1">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" onClick={addLineItem} className="mt-4 font-sans text-sm bg-primary/80 hover:bg-primary text-textOnPrimary px-3 py-1.5 rounded-md shadow-sm transition-colors flex items-center space-x-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                <span>{t('quotes.addItemBtn')}</span>
                            </button>
                        </section>

                        {/* ----- Bottom Section: Notes, Summary, Attachments ----- */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="dashboard-card">
                                    <label htmlFor="customerNotes" className="block text-sm font-medium text-primary mb-1">{t('quotes.customerNotesLabel')}</label>
                                    <textarea id="customerNotes" value={customerNotes} onChange={e => setCustomerNotes(e.target.value)} rows="3" className="form-element"></textarea>
                                </div>
                                <div className="dashboard-card">
                                    <label htmlFor="termsConditions" className="block text-sm font-medium text-primary mb-1">{t('quotes.termsConditionsLabel')}</label>
                                    <textarea id="termsConditions" value={termsConditions} onChange={e => setTermsConditions(e.target.value)} placeholder={t('quotes.termsConditionsPlaceholder')} rows="4" className="form-element"></textarea>
                                </div>
                            </div>

                            <div className="lg:col-span-1 dashboard-card space-y-3 font-sans text-sm">
                                <div className="flex justify-between items-center"><span className="text-secondary">{t('quotes.summary.subTotal')}:</span> <span className="font-semibold text-primary">₹{summaryTotals.subTotal}</span></div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="discountValue" className="text-secondary">{t('quotes.summary.discount')}:</label>
                                    <div className="flex">
                                        <input type="number" id="discountValue" value={discount} onChange={e => setDiscount(e.target.value)} className="form-element !p-1.5 text-sm text-right rounded-r-none" style={{ width: '60px' }} />
                                        <select value={discountType} onChange={e => setDiscountType(e.target.value)} className="form-element !p-1.5 text-sm rounded-l-none border-l-0" style={{ width: '50px' }}>
                                            <option value="%">%</option>
                                            <option value="amount">₹</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center"><span className="text-secondary"></span><span className="font-semibold text-primary">- ₹{summaryTotals.discountAmount}</span></div>

                                {/* TDS / TCS - simplified input for now */}
                                <div className="flex justify-between items-center">
                                    <label htmlFor="tdsInput" className="text-secondary">{t('quotes.summary.tds')}:</label>
                                    <input type="number" id="tdsInput" value={tds} onChange={e => setTds(e.target.value)} placeholder="0.00" className="form-element !p-1.5 text-sm text-right" style={{ width: '80px' }} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="tcsInput" className="text-secondary">{t('quotes.summary.tcs')}:</label>
                                    <input type="number" id="tcsInput" value={tcs} onChange={e => setTcs(e.target.value)} placeholder="0.00" className="form-element !p-1.5 text-sm text-right" style={{ width: '80px' }} />
                                </div>

                                <div className="flex justify-between items-center">
                                    <label htmlFor="adjustmentInput" className="text-secondary">{t('quotes.summary.adjustment')}:</label>
                                    <input type="number" id="adjustmentInput" value={adjustment} onChange={e => setAdjustment(e.target.value)} placeholder="0.00" className="form-element !p-1.5 text-sm text-right" style={{ width: '80px' }} />
                                </div>

                                <hr className="border-borderDefault my-2" />
                                <div className="flex justify-between items-center text-xl">
                                    <span className="font-heading text-primary">{t('quotes.summary.total')}:</span>
                                    <span className="font-heading text-primary font-bold">₹{summaryTotals.grandTotal}</span>
                                </div>
                            </div>
                        </section>

                        {/* File Attachments */}
                        <section className="dashboard-card">
                            <label className="block text-sm font-medium text-primary mb-1">{t('quotes.attachFilesLabel')}</label>
                             <input
                                type="file"
                                id="quote-files"
                                multiple
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                            />
                            <p className="text-xs text-secondary mt-1">{t('quotes.attachFilesHelp')}</p>
                            {attachedFiles.length > 0 && (
                                <div className="mt-2 text-xs text-secondary">
                                    <p>Selected: {attachedFiles.map(f => f.name).join(', ')}</p>
                                </div>
                            )}
                        </section>

                        <p className="text-xs text-center text-secondary font-sans">{t('quotes.additionalFieldsInfo')}</p>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                            <button type="button" onClick={() => console.log("Save as Draft clicked")} className="font-sans bg-background hover:bg-borderLight text-secondary px-6 py-3 rounded-lg shadow-sm border border-borderDefault transition-colors">
                                {t('quotes.saveAsDraftBtn')}
                            </button>
                            <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">
                                {t('quotes.saveAndSendBtn')}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default QuoteCreatePage;