// src/pages/Quotes/QuoteCreatePage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Assuming you have an XCircleIcon for removing items, or use text
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'; // Example icons

const initialLineItem = { id: Date.now(), itemDetails: '', quantity: 1, rate: '', taxPercent: '' }; // Kept tax for potential future use or if quotes can have item-level tax

const QuoteCreatePage = () => {
    const { t } = useTranslation();

    // --- Form State (Keep all your existing state) ---
    const [useSimplifiedView, setUseSimplifiedView] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [quoteNo, setQuoteNo] = useState('QT-000001'); // Placeholder
    const [referenceNo, setReferenceNo] = useState('');
    const [quoteDate, setQuoteDate] = useState(new Date().toISOString().slice(0, 10));
    const [expiryDate, setExpiryDate] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [projectName, setProjectName] = useState('');
    const [subject, setSubject] = useState('');
    const [lineItems, setLineItems] = useState([{ ...initialLineItem }]);
    const [customerNotes, setCustomerNotes] = useState(''); // Start empty, placeholder will be used
    const [termsConditions, setTermsConditions] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const [discount, setDiscount] = useState(0);
    const [discountType, setDiscountType] = useState('%');
    const [tds, setTds] = useState('');
    const [tcs, setTcs] = useState('');
    const [adjustment, setAdjustment] = useState(0);
    const [summaryTotals, setSummaryTotals] = useState({
        subTotal: 0, discountAmount: 0, tdsAmount: 0, tcsAmount: 0, grandTotal: 0,
    });

    // --- Handlers (Keep existing handlers) ---
    const handleLineItemChange = (index, field, value) => {
        const updatedItems = [...lineItems];
        updatedItems[index][field] = value;
        setLineItems(updatedItems);
    };
    const addLineItem = () => {
        setLineItems([...lineItems, { ...initialLineItem, id: Date.now() }]);
    };
    const removeLineItem = (index) => {
        if (lineItems.length > 0) {
            const updatedItems = lineItems.filter((_, i) => i !== index);
            setLineItems(updatedItems);
        }
    };
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).slice(0, 3);
        setAttachedFiles(files);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input for re-selection
    };

    // --- Calculation Logic (Simplified as before) ---
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

        const currentTdsAmount = parseFloat(tds) || 0;
        const currentTcsAmount = parseFloat(tcs) || 0;
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

    const handleSubmit = (e) => { /* ... same as before ... */ };

    // useEffect to set initial placeholder from t function after i18n is ready
    useEffect(() => {
        if(t && !customerNotes) { // Only set if notes are empty
            setCustomerNotes(t('quotes.customerNotesPlaceholder'));
        }
    }, [t, customerNotes]);


    return (
        <main className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h2 className="text-3xl font-heading text-primary">{t('quotes.pageTitle')}</h2>
                </div>
                <div className="mt-3 sm:mt-0">
                    <label className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-primary/5 transition-colors">
                        <input
                            type="checkbox"
                            checked={useSimplifiedView}
                            onChange={(e) => setUseSimplifiedView(e.target.checked)}
                            className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary focus:ring-offset-0"
                        />
                        <span className="text-sm font-sans text-secondary">{t('quotes.useSimplifiedView')}</span>
                    </label>
                </div>
            </div>

            {/* Single Card for the entire form */}
            <section className="dashboard-card">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* ----- Section 1: Customer & Quote Basic Info ----- */}
                    <div>
                        <h3 className="form-legend">{t('quotes.customerDetailsTitle', 'Customer & Quote Info')}</h3> {/* New key */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                            {/* Customer Name */}
                            <div className="md:col-span-1">
                                <label htmlFor="customerName" className="block text-sm font-medium text-primary mb-1">{t('quotes.customerNameLabel')}</label>
                                <input type="text" id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder={t('quotes.customerNamePlaceholder')} className="form-element" />
                            </div>
                            {/* Quote Number */}
                            <div>
                                <label htmlFor="quoteNo" className="block text-sm font-medium text-primary mb-1">{t('quotes.quoteNoLabel')}</label>
                                <input type="text" id="quoteNo" value={quoteNo} onChange={e => setQuoteNo(e.target.value)} className="form-element bg-background/70" readOnly />
                            </div>
                            {/* Reference Number */}
                            <div>
                                <label htmlFor="referenceNo" className="block text-sm font-medium text-primary mb-1">{t('quotes.referenceNoLabel')}</label>
                                <input type="text" id="referenceNo" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} className="form-element" />
                            </div>
                            {/* Quote Date */}
                            <div>
                                <label htmlFor="quoteDate" className="block text-sm font-medium text-primary mb-1">{t('quotes.quoteDateLabel')}</label>
                                <input type="date" id="quoteDate" value={quoteDate} onChange={e => setQuoteDate(e.target.value)} className="form-element" />
                            </div>
                            {/* Expiry Date */}
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-primary mb-1">{t('quotes.expiryDateLabel')}</label>
                                <input type="date" id="expiryDate" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder={t('quotes.expiryDatePlaceholder')} className="form-element" />
                            </div>
                            {/* Salesperson */}
                            <div>
                                <label htmlFor="salesperson" className="block text-sm font-medium text-primary mb-1">{t('quotes.salespersonLabel')}</label>
                                <input type="text" id="salesperson" value={salesperson} onChange={e => setSalesperson(e.target.value)} placeholder={t('quotes.salespersonPlaceholder')} className="form-element" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
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
                    </div>

                    {/* ----- Section 2: Item Table ----- */}
                    <div className="form-section-divider">
                        <h3 className="form-legend">{t('quotes.itemTable.title', 'Line Items')}</h3> {/* New Key */}
                        <div className="overflow-x-auto -mx-3"> {/* Negative margin to make table flush with card edges if desired */}
                            <table className="w-full min-w-[600px] sm:min-w-[700px]">
                                <thead className="font-sans text-xs text-secondary uppercase bg-background/70">
                                    <tr>
                                        <th className="py-2 px-2 text-center w-10">{/* Drag */}</th>
                                        <th className="py-2 px-2 text-left">{t('quotes.itemTable.itemDetails')}</th>
                                        <th className="py-2 px-2 text-center w-20 sm:w-24">{t('quotes.itemTable.quantity')}</th>
                                        <th className="py-2 px-2 text-right w-28 sm:w-32">{t('quotes.itemTable.rate')}</th>
                                        <th className="py-2 px-2 text-right w-28 sm:w-32">{t('quotes.itemTable.amount')}</th>
                                        <th className="py-2 px-2 text-center w-12">{/* Remove */}</th>
                                    </tr>
                                </thead>
                                <tbody className="font-sans divide-y divide-borderLight">
                                    {lineItems.map((item, index) => (
                                        <tr key={item.id} className="item-row group hover:bg-primary/5">
                                            <td className="py-2.5 px-2 text-gray-400 cursor-grab text-center group-hover:text-primary">⠿</td>
                                            <td className="py-2.5 px-2">
                                                <textarea value={item.itemDetails} onChange={e => handleLineItemChange(index, 'itemDetails', e.target.value)} placeholder={t('common.searchOrType')} className="form-element-sm !p-2 w-full resize-none" rows="1"></textarea>
                                            </td>
                                            <td className="py-2.5 px-1">
                                                <input type="number" value={item.quantity} onChange={e => handleLineItemChange(index, 'quantity', e.target.value)} min="0" className="form-element-sm !p-2 text-center" />
                                            </td>
                                            <td className="py-2.5 px-1">
                                                <input type="number" value={item.rate} onChange={e => handleLineItemChange(index, 'rate', e.target.value)} placeholder="0.00" step="0.01" className="form-element-sm !p-2 text-right" />
                                            </td>
                                            <td className="py-2.5 px-2 text-right text-primary">
                                                ₹{((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)).toFixed(2)}
                                            </td>
                                            <td className="py-2.5 px-2 text-center">
                                                <button type="button" onClick={() => removeLineItem(index)} className="text-gray-400 hover:text-danger-DEFAULT p-1 rounded-full hover:bg-danger-light">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button type="button" onClick={addLineItem} className="mt-4 font-sans text-sm text-primary hover:text-primary-dark font-medium py-2 px-3 rounded-md hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-colors flex items-center space-x-1.5">
                            <PlusCircleIcon className="w-5 h-5"/>
                            <span>{t('quotes.addItemBtn')}</span>
                        </button>
                    </div>

                    {/* ----- Section 3: Notes, Summary, Attachments ----- */}
                    <div className="form-section-divider">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <label htmlFor="customerNotes" className="block text-sm font-medium text-primary mb-1">{t('quotes.customerNotesLabel')}</label>
                                    <textarea id="customerNotes" value={customerNotes} onChange={e => setCustomerNotes(e.target.value)} rows="3" placeholder={t('quotes.customerNotesPlaceholder')} className="form-element"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="termsConditions" className="block text-sm font-medium text-primary mb-1">{t('quotes.termsConditionsLabel')}</label>
                                    <textarea id="termsConditions" value={termsConditions} onChange={e => setTermsConditions(e.target.value)} placeholder={t('quotes.termsConditionsPlaceholder')} rows="4" className="form-element"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="quote-files" className="block text-sm font-medium text-primary mb-1">{t('quotes.attachFilesLabel')}</label>
                                    <input
                                        type="file"
                                        id="quote-files"
                                        multiple
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer form-element !p-0" // Combined with form-element for consistency
                                    />
                                    <p className="text-xs text-secondary mt-1">{t('quotes.attachFilesHelp')}</p>
                                    {attachedFiles.length > 0 && (
                                        <div className="mt-2 text-xs text-secondary">
                                            <strong>{t('common.selectedFiles', 'Selected:')}</strong> {attachedFiles.map(f => f.name).join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="lg:col-span-1 space-y-2.5 pt-1 font-sans text-sm bg-background/70 p-4 rounded-lg border border-borderLight">
                                <div className="flex justify-between items-center"><span className="text-secondary">{t('quotes.summary.subTotal')}:</span> <span className="font-semibold text-primary text-base">₹{summaryTotals.subTotal}</span></div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="discountValue" className="text-secondary whitespace-nowrap mr-2">{t('quotes.summary.discount')}:</label>
                                    <div className="flex">
                                        <input type="number" id="discountValue" value={discount} onChange={e => setDiscount(e.target.value)} className="form-element-sm !p-1.5 text-right rounded-r-none" style={{ width: '60px' }} />
                                        <select value={discountType} onChange={e => setDiscountType(e.target.value)} className="form-element-sm !p-1.5 rounded-l-none border-l-0" style={{ width: '50px' }}>
                                            <option value="%">%</option><option value="amount">₹</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-right"><span className="text-secondary"></span><span className="font-semibold text-primary">- ₹{summaryTotals.discountAmount}</span></div>
                                
                                <div className="flex justify-between items-center"><label htmlFor="tdsInput" className="text-secondary">{t('quotes.summary.tds')}:</label><input type="number" id="tdsInput" value={tds} onChange={e => setTds(e.target.value)} placeholder="0.00" className="form-element-sm !p-1.5 text-right" style={{ width: '80px' }} /></div>
                                <div className="flex justify-between items-center"><label htmlFor="tcsInput" className="text-secondary">{t('quotes.summary.tcs')}:</label><input type="number" id="tcsInput" value={tcs} onChange={e => setTcs(e.target.value)} placeholder="0.00" className="form-element-sm !p-1.5 text-right" style={{ width: '80px' }} /></div>
                                <div className="flex justify-between items-center"><label htmlFor="adjustmentInput" className="text-secondary">{t('quotes.summary.adjustment')}:</label><input type="number" id="adjustmentInput" value={adjustment} onChange={e => setAdjustment(e.target.value)} placeholder="0.00" className="form-element-sm !p-1.5 text-right" style={{ width: '80px' }} /></div>
                                
                                <hr className="border-borderDefault my-2.5" />
                                <div className="flex justify-between items-center text-xl"><span className="font-heading text-primary">{t('quotes.summary.total')}:</span><span className="font-heading text-primary font-bold">₹{summaryTotals.grandTotal}</span></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-center text-secondary font-sans mt-6">{t('quotes.additionalFieldsInfo')}</p>
                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 mt-6 border-t border-borderLight">
                        <button type="button" onClick={() => console.log("Save as Draft clicked")} className="font-sans bg-cardBg hover:bg-borderLight text-secondary px-6 py-2.5 rounded-lg shadow-sm border border-borderDefault transition-colors">
                            {t('quotes.saveAsDraftBtn')}
                        </button>
                        <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-colors">
                            {t('quotes.saveAndSendBtn')}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default QuoteCreatePage;