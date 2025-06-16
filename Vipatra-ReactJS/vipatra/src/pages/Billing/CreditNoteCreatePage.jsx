// src/pages/Billing/CreditNoteCreatePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/common/Alert';

const initialCreditItem = { id: Date.now(), description: '', qty: 1, rate: '', amount: 0 };

// Dummy function (keep as is)
const fetchInvoiceDetailsForCredit = async (invoiceNo) => { /* ... */ };

const CreditNoteCreatePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // --- Form State (keep all your existing state variables) ---
    const [againstInvoiceNo, setAgainstInvoiceNo] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [creditNoteNo, setCreditNoteNo] = useState('');
    const [creditNoteDate, setCreditNoteDate] = useState(new Date().toISOString().slice(0, 10));
    const [reason, setReason] = useState('');
    const [itemsToCredit, setItemsToCredit] = useState([]);
    const [notes, setNotes] = useState('');
    const [totalCreditAmount, setTotalCreditAmount] = useState(0);
    const [formAlert, setFormAlert] = useState(null);

    // --- Handlers & Logic (keep all your existing functions) ---
    const handleLoadInvoiceDetails = async () => { /* ... */ };
    const handleItemChange = (index, field, value) => { /* ... */ };
    const addItemRow = () => { /* ... */ };
    const removeItemRow = (index) => { /* ... */ };
    useEffect(() => { /* For totalCreditAmount calculation */
        let total = 0;
        itemsToCredit.forEach(item => {
            total += parseFloat(item.amount) || 0;
        });
        setTotalCreditAmount(total.toFixed(2));
    }, [itemsToCredit]);

    const handleSubmit = (e) => { /* ... your existing submit logic ... */ };

    useEffect(() => {
        document.title = t('creditNote.pageTitleCreate');
    }, [t]);


    return (
        <main className="p-6 sm:p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-heading text-primary">{t('creditNote.pageTitleCreate')}</h2>
                <p className="text-secondary font-sans mt-1">{t('creditNote.pageSubtitle')}</p>
            </div>

            {formAlert && (
                <div className="mb-6">
                    <Alert type={formAlert.type} message={formAlert.messageKey ? t(formAlert.messageKey) : formAlert.message} onClose={() => setFormAlert(null)} />
                </div>
            )}

            {/* Single Card for the entire form */}
            <section className="dashboard-card">
                <form onSubmit={handleSubmit} className="space-y-8"> {/* Increased space-y for sections */}

                    {/* Section 1: Basic Information & Invoice Link */}
                    <fieldset>
                        <legend className="form-legend">{t('creditNote.section.basicInfo', 'Basic Information')}</legend> {/* New translation key */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
                            <div>
                                <label htmlFor="againstInvoiceNo" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('creditNote.againstInvoiceLabel')}</label>
                                <div className="flex">
                                    <input type="text" id="againstInvoiceNo" value={againstInvoiceNo} onChange={e => setAgainstInvoiceNo(e.target.value)} placeholder={t('creditNote.invoiceNoPlaceholder')} className="form-element rounded-r-none" />
                                    <button type="button" onClick={handleLoadInvoiceDetails} className="bg-accent hover:bg-accent-dark text-textDark px-4 py-2 rounded-r-lg text-sm font-semibold whitespace-nowrap flex-shrink-0">{t('creditNote.loadInvoiceDetailsBtn')}</button>
                                </div>
                            </div>
                            <div> {/* Empty for alignment or add another field */} </div>

                            <div>
                                <label htmlFor="creditNoteNo" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('creditNote.creditNoteNoLabel')}</label>
                                <input type="text" id="creditNoteNo" value={creditNoteNo} onChange={e => setCreditNoteNo(e.target.value)} placeholder={t('creditNote.creditNoteNoPlaceholder')} className="form-element" />
                            </div>
                            <div>
                                <label htmlFor="creditNoteDate" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('creditNote.creditNoteDateLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                <input type="date" id="creditNoteDate" value={creditNoteDate} onChange={e => setCreditNoteDate(e.target.value)} className="form-element" required />
                            </div>
                        </div>
                    </fieldset>

                    {/* Section 2: Customer Details (Often auto-filled) */}
                    <fieldset>
                        <legend className="form-legend">{t('creditNote.customerDetails')}</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
                            <div>
                                <label htmlFor="customerNameCredit" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('creditNote.customerNameLabel')}</label>
                                <input type="text" id="customerNameCredit" value={customerName} onChange={e => setCustomerName(e.target.value)} className="form-element bg-background" readOnly={!!againstInvoiceNo && customerName !== ''} />
                            </div>
                            <div>
                                <label htmlFor="customerEmailCredit" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('creditNote.customerEmailLabel')}</label>
                                <input type="email" id="customerEmailCredit" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} className="form-element bg-background" readOnly={!!againstInvoiceNo && customerEmail !== ''} />
                            </div>
                        </div>
                    </fieldset>

                    {/* Section 3: Reason for Credit */}
                    <fieldset>
                        <legend className="form-legend">{t('creditNote.reasonSectionTitle', 'Reason for Credit')}</legend> {/* New Key */}
                        <div className="mt-4">
                            <label htmlFor="reason" className="block text-sm font-medium text-primary mb-1.5 font-sans">
                                {t('creditNote.reasonLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span>
                            </label>
                            <textarea id="reason" value={reason} onChange={e => setReason(e.target.value)} rows="3" placeholder={t('creditNote.reasonPlaceholder')} className="form-element" required></textarea>
                        </div>
                    </fieldset>

                    {/* Section 4: Items to Credit / Adjust */}
                    <fieldset>
                        <legend className="form-legend">{t('creditNote.itemsToCredit')}</legend>
                        <div id="creditItemsContainer" className="space-y-3 mt-4"> {/* Reduced space-y */}
                            {itemsToCredit.map((item, index) => (
                                <div key={item.id} className="invoice-item-row"> {/* Reusing .invoice-item-row styles */}
                                    <div className="col-span-12 md:col-span-5 lg:col-span-5">
                                        <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('creditNote.itemNameLabel')}</label>
                                        <input type="text" name="description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder={t('items.newItemForm.itemPlaceholder')} className="form-element-sm" />
                                    </div>
                                    <div className="col-span-4 md:col-span-2 lg:col-span-2">
                                        <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('creditNote.itemQtyLabel')}</label>
                                        <input type="number" name="qty" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} min="0" className="form-element-sm text-center" />
                                    </div>
                                    <div className="col-span-4 md:col-span-2 lg:col-span-2">
                                        <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('creditNote.itemRateLabel')}</label>
                                        <input type="number" name="rate" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} placeholder="0.00" step="0.01" className="form-element-sm text-right" />
                                    </div>
                                    <div className="col-span-3 md:col-span-2 lg:col-span-2 text-right self-center">
                                        <label className="block text-xs font-medium text-primary mb-0.5 font-sans invisible sm:visible">{t('creditNote.itemAmountLabel')}</label>
                                        <span className="font-semibold text-primary text-sm block pt-2 sm:pt-0">₹{item.amount || '0.00'}</span>
                                    </div>
                                    <div className="col-span-1 flex justify-end items-center md:self-center">
                                        <button type="button" className="text-danger-DEFAULT hover:text-danger-dark p-1 mt-4 md:mt-0" onClick={() => removeItemRow(index)}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addItemRow} className="mt-4 font-sans text-sm bg-primary/80 hover:bg-primary text-textOnPrimary px-4 py-2 rounded-lg shadow-soft transition-colors duration-200 flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            <span>{t('creditNote.addItemBtn')}</span>
                        </button>
                        <div className="text-right mt-6"> {/* Increased mt */}
                            <p className="text-xl font-heading text-primary">{t('creditNote.totalCreditAmount')} <span className="font-bold">₹{totalCreditAmount}</span></p>
                        </div>
                    </fieldset>

                    {/* Section 5: Notes */}
                    <fieldset>
                        <legend className="form-legend">{t('creditNote.notesLabel')}</legend>
                        <textarea id="notesCredit" value={notes} onChange={e => setNotes(e.target.value)} rows="3" placeholder={t('creditNote.notesPlaceholder')} className="form-element mt-4"></textarea>
                    </fieldset>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-borderLight mt-2">
                        <button type="button" onClick={() => { console.log("Preview Credit Note"); alert("Preview functionality to be implemented."); }}
                            className="font-sans bg-secondary hover:bg-secondary/80 text-textOnSecondary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2">
                            <span>{t('creditNote.previewCreditNoteBtn')}</span>
                        </button>
                        <button type="submit"
                            className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>{t('creditNote.generateAndSendBtn')}</span>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default CreditNoteCreatePage;