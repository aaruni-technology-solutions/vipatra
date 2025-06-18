// src/pages/Payments/PaymentReceivedCreatePage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/common/Alert';

const initialReceiptItem = { id: Date.now(), description: '', qty: 1, rate: '', amount: 0 };

const PaymentReceivedCreatePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // --- All your state and logic remains the same ---
    const [receiptNo, setReceiptNo] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
    const [receivedFromName, setReceivedFromName] = useState('');
    const [receivedFromAddress, setReceivedFromAddress] = useState('');
    const [receivedFromPhone, setReceivedFromPhone] = useState('');
    const [receivedFromEmail, setReceivedFromEmail] = useState('');
    const [amountReceived, setAmountReceived] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [referenceNo, setReferenceNo] = useState('');
    const [receiptItems, setReceiptItems] = useState([]);
    const [addItems, setAddItems] = useState(false);
    const [notes, setNotes] = useState('');
    const [formAlert, setFormAlert] = useState(null);

    const handleItemChange = (index, field, value) => { /* ... your logic ... */ };
    const addItemRow = () => setReceiptItems([...receiptItems, { ...initialReceiptItem, id: Date.now() }]);
    const removeItemRow = (index) => { /* ... your logic ... */ };

    useEffect(() => {
        if (!addItems) setReceiptItems([]);
        else if (addItems && receiptItems.length === 0) addItemRow();
    }, [addItems]);

    const handleSubmit = (e) => { e.preventDefault(); /* ... your logic ... */ };

    const paymentMethodOptions = [
        { value: 'cash', labelKey: 'paymentMethods.cash' }, { value: 'upi', labelKey: 'paymentMethods.upi' },
        { value: 'card', labelKey: 'paymentMethods.card' }, { value: 'netBanking', labelKey: 'paymentMethods.netBanking' },
        { value: 'cheque', labelKey: 'paymentMethods.cheque' }, { value: 'other', labelKey: 'paymentMethods.other' },
    ];

    useEffect(() => { document.title = t('paymentReceivedCreate.pageTitle'); }, [t]);


    return (
        // 1. THE PERFECT PAGE LAYOUT
        <main className="flex flex-col h-full bg-background">
            
            {/* 2. THE STICKY HEADER BLOCK */}
            <div className="sticky top-0 z-10 bg-background px-6 sm:px-8 pt-4 pb-6">
                <h2 className="text-3xl font-heading text-primary">{t('paymentReceivedCreate.pageTitle')}</h2>
                
            </div>
            
            {/* 3. THE SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8">
                
                {formAlert && (
                    <div className="mb-6">
                        <Alert type={formAlert.type} message={formAlert.messageKey ? t(formAlert.messageKey) : formAlert.message} onClose={() => setFormAlert(null)} />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="dashboard-card space-y-8">
                    
                    {/* ALL YOUR FORM SECTIONS ARE HERE, UNCHANGED */}

                    {/* Section 1: Receipt Information */}
                    <fieldset>
                    <legend className="form-legend">{t('paymentReceivedCreate.headerInfo')}</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4"> {/* Added mt-4 */}
                        <div>
                            <label htmlFor="receiptNo" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.receiptNoLabel')}</label>
                            <input type="text" id="receiptNo" value={receiptNo} onChange={e => setReceiptNo(e.target.value)} placeholder={t('paymentReceivedCreate.receiptNoPlaceholder')} className="form-element" />
                        </div>
                        <div>
                            <label htmlFor="paymentDate" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.paymentDateLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <input type="date" id="paymentDate" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className="form-element" required />
                        </div>
                    </div>
                </fieldset>

                    {/* Section 2: Received From */}
                    <fieldset>
                    <legend className="form-legend">{t('paymentReceivedCreate.receivedFrom')}</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
                        <div>
                            <label htmlFor="receivedFromName" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.nameLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <input type="text" id="receivedFromName" value={receivedFromName} onChange={e => setReceivedFromName(e.target.value)} className="form-element" required />
                        </div>
                        <div>
                            <label htmlFor="receivedFromPhone" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.phoneLabel')}</label>
                            <input type="tel" id="receivedFromPhone" value={receivedFromPhone} onChange={e => setReceivedFromPhone(e.target.value)} className="form-element" />
                        </div>
                        <div className="md:col-span-2"> {/* Address spans full width on medium up */}
                            <label htmlFor="receivedFromAddress" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.addressLabel')}</label>
                            <textarea id="receivedFromAddress" value={receivedFromAddress} onChange={e => setReceivedFromAddress(e.target.value)} rows="2" className="form-element"></textarea>
                        </div>
                        <div className="md:col-span-2"> {/* Email spans full width on medium up */}
                            <label htmlFor="receivedFromEmail" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.emailLabel')}</label>
                            <input type="email" id="receivedFromEmail" value={receivedFromEmail} onChange={e => setReceivedFromEmail(e.target.value)} className="form-element" />
                        </div>
                    </div>
                </fieldset>

                    {/* Section 3: Payment Details */}
                   <fieldset>
                    <legend className="form-legend">{t('paymentReceivedCreate.paymentDetails')}</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-4">
                        <div>
                            <label htmlFor="amountReceived" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.amountReceivedLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <input type="number" id="amountReceived" value={amountReceived} onChange={e => setAmountReceived(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required />
                        </div>
                        <div>
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.paymentMethodLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <select id="paymentMethod" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="form-element" required>
                                <option value="" disabled>{t('expenses.newExpenseForm.selectCategoryOption', '-- Select Method --')}</option>
                                {paymentMethodOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2"> {/* Reference No spans full width */}
                            <label htmlFor="referenceNo" className="block text-sm font-medium text-primary mb-1.5 font-sans">{t('paymentReceivedCreate.referenceNoLabel')}</label>
                            <input type="text" id="referenceNo" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} placeholder={t('paymentReceivedCreate.referenceNoPlaceholder')} className="form-element" />
                        </div>
                    </div>
                </fieldset>

                    {/* Section 4: Item Details (Optional) */}
                     <fieldset>
                    <div className="flex items-center justify-between mb-4 border-b border-borderLight pb-2">
                        <legend className="form-legend !mb-0 !border-b-0">{t('paymentReceivedCreate.itemDetailsOptional')}</legend> {/* Use !mb-0 to override legend's default mb */}
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={addItems} onChange={(e) => setAddItems(e.target.checked)} className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" />
                            <span className="text-sm font-medium text-primary font-sans">{t('common.add', 'Add')}</span>
                        </label>
                    </div>
                    {addItems && (
                        <div id="receiptItemsContainer" className="space-y-3 mt-4"> {/* Added mt-4 */}
                            {receiptItems.map((item, index) => (
                                // Using your .invoice-item-row for consistency or create a new .receipt-item-row
                                <div key={item.id} className="invoice-item-row"> {/* Re-using invoice-item-row styles */}
                                    <div className="col-span-12 md:col-span-5 lg:col-span-5">
                                        <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('paymentReceivedCreate.itemNameLabel')}</label>
                                        <input type="text" name="description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder={t('items.newItemForm.itemPlaceholder')} className="form-element-sm" />
                                    </div>
                                    <div className="col-span-4 md:col-span-2 lg:col-span-2">
                                        <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('paymentReceivedCreate.itemQtyLabel')}</label>
                                        <input type="number" name="qty" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} min="1" className="form-element-sm text-center" />
                                    </div>
                                    <div className="col-span-4 md:col-span-2 lg:col-span-2">
                                        <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('paymentReceivedCreate.itemRateLabel')}</label>
                                        <input type="number" name="rate" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} placeholder="0.00" step="0.01" className="form-element-sm text-right" />
                                    </div>
                                    <div className="col-span-3 md:col-span-2 lg:col-span-2 text-right self-center">
                                        <label className="block text-xs font-medium text-primary mb-0.5 font-sans invisible sm:visible">{t('paymentReceivedCreate.itemAmountLabel')}</label>
                                        <span className="font-semibold text-primary text-sm block pt-2 sm:pt-0">₹{item.amount || '0.00'}</span>
                                    </div>
                                    <div className="col-span-1 flex justify-end items-center md:self-center">
                                        <button type="button" className="text-danger-DEFAULT hover:text-danger-dark p-1 mt-4 md:mt-0" onClick={() => removeItemRow(index)}>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addItemRow} className="mt-4 font-sans text-sm bg-primary/80 hover:bg-primary text-textOnPrimary px-4 py-2 rounded-lg shadow-soft transition-colors duration-200 flex items-center space-x-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                <span>{t('paymentReceivedCreate.addItemBtn')}</span>
                            </button>
                        </div>
                    )}
                </fieldset>


                    {/* Section 5: Notes */}
                    <fieldset>
                        <legend className="form-legend">{t('paymentReceivedCreate.notesLabel')}</legend>
                        <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows="3" placeholder={t('paymentReceivedCreate.notesPlaceholder')} className="form-element mt-4"></textarea>
                    </fieldset>

                    {/* Form Actions */}
                     <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-borderLight mt-2"> {/* Added mt-2 */}
                    <button type="button" onClick={() => { console.log("Preview Clicked"); alert("Preview functionality to be implemented."); }}
                        className="font-sans bg-secondary hover:bg-secondary/80 text-textOnSecondary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2">
                        <span>{t('paymentReceivedCreate.previewReceiptBtn')}</span>
                    </button>
                    <button type="submit"
                        className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{t('paymentReceivedCreate.saveAndGenerateBtn')}</span>
                    </button>
                </div>

                </form>
            </div>
        </main>
    );
};

export default PaymentReceivedCreatePage;