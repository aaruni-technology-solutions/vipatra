// src/pages/Invoices/InvoiceCreatePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const initialLineItem = { id: Date.now(), itemName: '', itemQty: 1, itemPrice: '', itemTax: '', itemAmount: 0 };

const InvoiceCreatePage = () => {
    const { t } = useTranslation();

    // --- State Variables ---
    const [invoiceType, setInvoiceType] = useState('');
    const [customerSearch, setCustomerSearch] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [lineItems, setLineItems] = useState([{ ...initialLineItem }]);
    const [invoiceNotes, setInvoiceNotes] = useState('');
    const [privateNotes, setPrivateNotes] = useState('');
    const [overallDiscountValue, setOverallDiscountValue] = useState(0);
    const [overallDiscountType, setOverallDiscountType] = useState('amount');
    const [generateEInvoice, setGenerateEInvoice] = useState(false);
    const [summary, setSummary] = useState({ subtotal: 0, itemTax: 0, discountAmount: 0, grandTotal: 0 });
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    // --- Handlers & Logic ---
    const handleLineItemChange = (index, field, value) => {
        const updatedItems = [...lineItems];
        updatedItems[index][field] = value;
        // Recalculate item amount if qty or price changes
        if (field === 'itemQty' || field === 'itemPrice') {
            const qty = parseFloat(updatedItems[index].itemQty) || 0;
            const price = parseFloat(updatedItems[index].itemPrice) || 0;
            updatedItems[index].itemAmount = qty * price; // Store base amount before tax for clarity
        }
        setLineItems(updatedItems);
    };

    const addLineItem = () => {
        setLineItems([...lineItems, { ...initialLineItem, id: Date.now() }]);
    };

    const removeLineItem = (index) => {
        if (lineItems.length > 1) {
            const updatedItems = lineItems.filter((_, i) => i !== index);
            setLineItems(updatedItems);
        } else {
            alert(t('invoiceCreate.alert.atLeastOneItem'));
        }
    };

    const calculateTotals = useCallback(() => {
        let subtotal = 0;
        let totalItemTaxAmount = 0;

        lineItems.forEach(item => {
            const qty = parseFloat(item.itemQty) || 0;
            const price = parseFloat(item.itemPrice) || 0;
            const taxRate = parseFloat(item.itemTax) || 0;

            const itemTotalWithoutTax = qty * price;
            subtotal += itemTotalWithoutTax;
            totalItemTaxAmount += itemTotalWithoutTax * (taxRate / 100);
        });

        let discountAmount = 0;
        const discountVal = parseFloat(overallDiscountValue) || 0;
        if (overallDiscountType === 'percent') {
            // Apply discount on (subtotal + totalItemTaxAmount) or just subtotal? Usually subtotal. Let's assume subtotal.
            discountAmount = subtotal * (discountVal / 100);
        } else {
            discountAmount = discountVal;
        }
        discountAmount = Math.min(discountAmount, subtotal); // Discount shouldn't exceed subtotal


        const grandTotal = subtotal + totalItemTaxAmount - discountAmount;

        setSummary({
            subtotal: subtotal.toFixed(2),
            itemTax: totalItemTaxAmount.toFixed(2),
            discountAmount: discountAmount.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
        });
    }, [lineItems, overallDiscountValue, overallDiscountType]);

    useEffect(() => {
        calculateTotals();
    }, [calculateTotals]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            invoiceType,
            customer: customerSearch || { name: customerName, phone: customerPhone, email: customerEmail, address: customerAddress },
            items: lineItems,
            notes: invoiceNotes,
            privateNotes,
            discount: { value: overallDiscountValue, type: overallDiscountType },
            generateEInvoice,
            totals: summary,
        };
        console.log("Invoice Form Data:", formData);
        alert(t('invoiceCreate.alert.formSubmitted'));
    };

    const stepNames = [ // For Stepper and Section Titles
        t('invoiceCreate.stepper.step1Name'),
        t('invoiceCreate.stepper.step2Name'),
        t('invoiceCreate.stepper.step3Name'),
        t('invoiceCreate.stepper.step4Name'), // "Summary & Options"
        t('invoiceCreate.stepper.step5Name')  // "Finalize"
    ];

    const StepperUI = ({ current, total, names }) => (
        <div className="mb-10 hidden sm:flex justify-between items-start font-sans text-sm px-4 md:px-8 lg:px-0">
            {names.slice(0, total).map((stepName, i) => (
                <div
                    key={i}
                    className={`flex flex-col items-center text-center relative ${i + 1 === current ? 'text-primary font-semibold' : 'text-secondary'} ${i + 1 < current ? 'text-primary' : ''}`}
                    style={{ flexBasis: '19%' }}
                >
                    <div className={`text-lg font-bold mb-1 ${i + 1 === current ? 'text-primary' : (i + 1 < current ? 'text-primary' : 'text-gray-400')}`}>
                        {i + 1}
                    </div>
                    <p className="text-xs leading-tight w-full truncate">{stepName}</p>
                </div>
            ))}
        </div>
    );

    return (
        <main className="p-6 sm:p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-heading text-primary">{t('invoiceCreate.title')}</h2>
                <p className="text-secondary font-sans mt-1">{t('invoiceCreate.subtitle')}</p>
            </div>

            <StepperUI current={currentStep} total={totalSteps} names={stepNames} />

            {/* Single Card for the entire form */}
            <section className="dashboard-card">
                <form id="invoiceForm" onSubmit={handleSubmit} className="space-y-8">

                    {/* Section 1: Invoice Type & Customer Details */}
                    <div> {/* Using simple divs as logical groupers now, styled by form-section-divider or fieldset */}
                        <h3 className="form-legend">{t('invoiceCreate.section.invoiceAndCustomer', 'Invoice & Customer Details')}</h3> {/* New translation key */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                            <div>
                                <label htmlFor="invoiceType" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceCreate.step1.invoiceFor')}</label>
                                <select id="invoiceType" name="invoiceType" value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)} className="form-element">
                                    <option value="" disabled>{t('invoiceCreate.step1.chooseType')}</option>
                                    <option value="consultation">{t('invoiceCreate.step1.types.consultation')}</option>
                                    <option value="therapy">{t('invoiceCreate.step1.types.therapy')}</option>
                                    <option value="retail_sale">{t('invoiceCreate.step1.types.retail')}</option>
                                    <option value="batch_sale">{t('invoiceCreate.step1.types.batch')}</option>
                                </select>
                            </div>
                            <div> {/* Placeholder for Invoice Date / Due Date if needed here */}
                                <label htmlFor="invoiceDate" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceCreate.invoiceDateLabel', 'Invoice Date')}</label>
                                <input type="date" id="invoiceDate" name="invoiceDate" defaultValue={new Date().toISOString().slice(0,10)} className="form-element" />
                            </div>

                            {/* Customer Details within the same grid or a subgrid */}
                            <div className="md:col-span-2">
                                <label htmlFor="customerSearch" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceCreate.step2.searchExisting')}</label>
                                <input type="text" id="customerSearch" name="customerSearch" value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} placeholder={t('invoiceCreate.step2.searchPlaceholder')} className="form-element mb-3" />
                            </div>

                            <details className="md:col-span-2 group">
                                <summary className="text-sm font-medium text-primary hover:text-accent cursor-pointer list-none flex items-center mb-2">
                                    <span>{t('invoiceCreate.step2.addNewDetails')}</span>
                                    <svg className="w-4 h-4 ml-1 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </summary>
                                <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <div><label htmlFor="customerName" className="block text-sm font-medium text-primary mb-1 font-sans">{t('common.fullName')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label><input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-element" /></div>
                                    <div><label htmlFor="customerEmail" className="block text-sm font-medium text-primary mb-1 font-sans">{t('common.emailAddress')}</label><input type="email" id="customerEmail" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="form-element" /></div>
                                    <div><label htmlFor="customerPhone" className="block text-sm font-medium text-primary mb-1 font-sans">{t('common.phoneNumber')}</label><input type="tel" id="customerPhone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="form-element" /></div>
                                    <div className="md:col-span-2"><label htmlFor="customerAddress" className="block text-sm font-medium text-primary mb-1 font-sans">{t('common.addressOptional')}</label><textarea id="customerAddress" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} rows="2" className="form-element"></textarea></div>
                                </div>
                            </details>
                        </div>
                    </div>

                    {/* Section 2: Add Items/Services */}
                    <div className="form-section-divider"> {/* Visual divider */}
                        <h3 className="form-legend">{t('invoiceCreate.step3.title')}</h3>
                        <div id="invoiceItemsContainer" className="space-y-3">
                            {lineItems.map((item, index) => (
                                <div key={item.id} className="invoice-item-row"> {/* item row with more columns */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-5"> {/* Item Name */}
                                        <input type="text" name="itemName" value={item.itemName} onChange={(e) => handleLineItemChange(index, 'itemName', e.target.value)} placeholder={t('invoiceCreate.step3.itemPlaceholder')} className="form-element-sm" />
                                    </div>
                                    <div className="col-span-4 md:col-span-2 lg:col-span-1"> {/* Qty */}
                                        <input type="number" name="itemQty" value={item.itemQty} onChange={(e) => handleLineItemChange(index, 'itemQty', e.target.value)} min="1" className="form-element-sm text-center" />
                                    </div>
                                    <div className="col-span-4 md:col-span-2 lg:col-span-2"> {/* Price */}
                                        <input type="number" name="itemPrice" value={item.itemPrice} onChange={(e) => handleLineItemChange(index, 'itemPrice', e.target.value)} placeholder="0.00" step="0.01" className="form-element-sm text-right" />
                                    </div>
                                    <div className="col-span-4 md:col-span-2 lg:col-span-2"> {/* Tax */}
                                        <input type="number" name="itemTax" value={item.itemTax} onChange={(e) => handleLineItemChange(index, 'itemTax', e.target.value)} placeholder={t('invoiceCreate.step3.taxPlaceholder', 'Tax %')} className="form-element-sm text-right" />
                                    </div>
                                    <div className="col-span-12 md:col-span-2 lg:col-span-1 text-right self-center font-semibold text-primary"> {/* Amount */}
                                        ₹{item.itemAmount.toFixed(2)}
                                    </div>
                                    <div className="col-span-12 md:col-span-1 flex justify-end md:self-center"> {/* Remove Button */}
                                        <button type="button" className="text-danger-DEFAULT hover:text-danger-dark p-1" onClick={() => removeLineItem(index)}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addLineItem} className="mt-4 font-sans text-sm bg-primary/80 hover:bg-primary text-textOnPrimary px-4 py-2 rounded-lg shadow-soft transition-colors duration-200 flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            <span>{t('invoiceCreate.step3.addItemBtn')}</span>
                        </button>
                    </div>

                    {/* Section 3: Summary, Notes, e-Invoicing */}
                    <div className="form-section-divider">
                        <h3 className="form-legend">{stepNames[3]}</h3> {/* Title: Summary & Options */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
                            {/* Notes and e-Invoicing on the left (2/3 width) */}
                            <div className="lg:col-span-2 space-y-5">
                                <div><label htmlFor="invoiceNotes" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceCreate.totalsSection.notesLabel')}</label><textarea id="invoiceNotes" value={invoiceNotes} onChange={(e) => setInvoiceNotes(e.target.value)} rows="3" placeholder={t('invoiceCreate.totalsSection.notesPlaceholder')} className="form-element"></textarea></div>
                                <div><label htmlFor="privateNotes" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceCreate.totalsSection.privateNotesLabel')}</label><textarea id="privateNotes" value={privateNotes} onChange={(e) => setPrivateNotes(e.target.value)} rows="2" placeholder={t('invoiceCreate.totalsSection.privateNotesPlaceholder')} className="form-element"></textarea></div>
                                <div className="pt-2">
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" id="generateEInvoice" checked={generateEInvoice} onChange={(e) => setGenerateEInvoice(e.target.checked)} className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" />
                                        <span className="text-md font-medium text-primary font-sans">{t('invoiceCreate.eInvoiceOption.generateLabel')}</span>
                                    </label>
                                    <p className="text-xs text-secondary mt-1 pl-8">{t('invoiceCreate.eInvoiceOption.description')}</p>
                                </div>
                            </div>
                            {/* Summary on the right (1/3 width) */}
                            <div className="lg:col-span-1 space-y-2 pt-1 font-sans text-sm bg-background p-4 rounded-lg border border-borderLight self-start"> {/* Added self-start */}
                                <div className="flex justify-between items-center"><span className="text-secondary">{t('invoiceCreate.summary.subtotal')}</span><span className="font-semibold text-primary">₹{summary.subtotal}</span></div>
                                <div className="flex justify-between items-center"><span className="text-secondary">{t('invoiceCreate.summary.itemTax')}</span><span className="font-semibold text-primary">₹{summary.itemTax}</span></div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="overallDiscountValue" className="text-secondary whitespace-nowrap mr-2">{t('invoiceCreate.summary.overallDiscount')}</label>
                                    <div className="flex"><input type="number" id="overallDiscountValue" value={overallDiscountValue} onChange={(e) => setOverallDiscountValue(e.target.value)} className="form-element-sm !p-1.5 text-right rounded-r-none" style={{ width: '60px' }} /><select id="overallDiscountType" value={overallDiscountType} onChange={(e) => setOverallDiscountType(e.target.value)} className="form-element-sm !p-1.5 rounded-l-none border-l-0" style={{ width: '50px' }}><option value="amount">₹</option><option value="percent">%</option></select></div>
                                </div>
                                <div className="flex justify-between items-center"><span className="text-secondary">{t('invoiceCreate.summary.calculatedDiscount')}</span><span className="font-semibold text-primary">- ₹{summary.discountAmount}</span></div>
                                <hr className="border-borderDefault my-2" />
                                <div className="flex justify-between items-center text-lg"><span className="font-heading text-primary">{t('invoiceCreate.summary.grandTotal')}</span><span className="font-heading text-primary font-bold">₹{summary.grandTotal}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Finalize (Preview & Send) */}
                    <div className="form-section-divider">
                        <h3 className="form-legend">{stepNames[4]}</h3>
                        <div className="mb-6 p-4 border border-borderDefault rounded-lg bg-background min-h-[150px] flex items-center justify-center">
                            <p className="text-center text-secondary font-sans">{t('invoiceCreate.step5.previewPlaceholder')}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                            <button type="button" className="font-sans bg-secondary hover:bg-secondary/80 text-textOnSecondary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                <span>{t('actions.downloadPDF')}</span>
                            </button>
                                <button type="button" className="font-sans border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                                <span>{t('invoiceCreate.actions.saveAsDraft', 'Save as Draft')}</span>
                            </button>
                            <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span>{t('invoiceCreate.actions.generateAndSend')}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default InvoiceCreatePage;