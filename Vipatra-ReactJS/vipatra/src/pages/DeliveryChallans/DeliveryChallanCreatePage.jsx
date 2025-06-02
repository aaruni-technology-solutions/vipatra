// src/pages/DeliveryChallans/DeliveryChallanCreatePage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar'; // Adjust if you have a specific sidebar
import Footer from '../../components/layout/Footer';

const initialLineItem = { id: Date.now(), itemDetails: '', quantity: 1, description: '' };

const DeliveryChallanCreatePage = () => {
    const { t } = useTranslation();

    // --- Form State ---
    const [customerName, setCustomerName] = useState('');
    const [challanNo, setChallanNo] = useState('DC-00001'); // Should be auto-generated
    const [referenceNo, setReferenceNo] = useState('');
    const [challanDate, setChallanDate] = useState(new Date().toISOString().slice(0, 10));
    const [challanType, setChallanType] = useState('');
    const [lineItems, setLineItems] = useState([{ ...initialLineItem }]);
    const [customerNotes, setCustomerNotes] = useState('');
    const [termsConditions, setTermsConditions] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const fileInputRef = useRef(null);

    // Summary State (Simplified for Challan)
    const [totalQuantity, setTotalQuantity] = useState(0);

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
        if (lineItems.length > 0) {
            const updatedItems = lineItems.filter((_, i) => i !== index);
            setLineItems(updatedItems);
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).slice(0, 3);
        setAttachedFiles(files);
    };

    // --- Calculation Logic ---
    const calculateSummary = useCallback(() => {
        let currentTotalQuantity = 0;
        lineItems.forEach(item => {
            currentTotalQuantity += parseFloat(item.quantity) || 0;
        });
        setTotalQuantity(currentTotalQuantity);
    }, [lineItems]);

    useEffect(() => {
        calculateSummary();
    }, [calculateSummary]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const challanData = {
            customerName, challanNo, referenceNo, challanDate, challanType,
            items: lineItems, customerNotes, termsConditions, attachedFiles,
            totalQuantity,
        };
        console.log("Delivery Challan Data:", challanData);
        alert(t('common.formSubmitted', "Form Submitted (check console)"));
    };

    const challanTypes = [
        { value: "jobWork", labelKey: "deliveryChallans.types.jobWork" },
        { value: "supplyOnApproval", labelKey: "deliveryChallans.types.supplyOnApproval" },
        { value: "supplyLiquidGas", labelKey: "deliveryChallans.types.supplyLiquidGas" },
        { value: "others", labelKey: "deliveryChallans.types.others" },
    ];


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> {/* Ensure "New Delivery Challan" or similar is active */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-heading text-primary">{t('deliveryChallans.pageTitle')}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* ----- Top Section: Customer, Challan Details ----- */}
                        <section className="dashboard-card">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="customerNameDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.customerNameLabel')}</label>
                                    <input type="text" id="customerNameDc" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder={t('deliveryChallans.customerNamePlaceholder')} className="form-element" />
                                </div>
                                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="challanNoDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.challanNoLabel')}</label>
                                        <input type="text" id="challanNoDc" value={challanNo} onChange={e => setChallanNo(e.target.value)} className="form-element bg-background" readOnly />
                                    </div>
                                    <div>
                                        <label htmlFor="referenceNoDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.referenceNoLabel')}</label>
                                        <input type="text" id="referenceNoDc" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} className="form-element" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label htmlFor="challanDateDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.challanDateLabel')}</label>
                                    <input type="date" id="challanDateDc" value={challanDate} onChange={e => setChallanDate(e.target.value)} className="form-element" />
                                </div>
                                <div>
                                    <label htmlFor="challanTypeDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.challanTypeLabel')}</label>
                                    <select id="challanTypeDc" value={challanType} onChange={e => setChallanType(e.target.value)} className="form-element">
                                        <option value="" disabled>{t('deliveryChallans.challanTypePlaceholder')}</option>
                                        {challanTypes.map(type => (
                                            <option key={type.value} value={type.value}>{t(type.labelKey)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* ----- Item Table ----- */}
                        <section className="dashboard-card">
                            <h3 className="text-lg font-heading text-primary mb-3">{t('deliveryChallans.itemTable.itemDetails')}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px]"> {/* Adjusted min-width */}
                                    <thead className="font-sans text-xs text-secondary uppercase">
                                        <tr>
                                            <th className="pb-2 text-left w-6">{/* Drag */}</th>
                                            <th className="pb-2 text-left flex-1">{t('deliveryChallans.itemTable.itemDetails')}</th>
                                            <th className="pb-2 text-center w-32">{t('deliveryChallans.itemTable.quantity')}</th>
                                            <th className="pb-2 text-left w-1/3">{t('deliveryChallans.itemTable.descriptionOptional')}</th>
                                            <th className="pb-2 text-center w-10">{/* Remove */}</th>
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
                                                    <input type="text" value={item.description} onChange={e => handleLineItemChange(index, 'description', e.target.value)} placeholder={t('common.optional', 'Optional')} className="form-element !p-2 text-sm" />
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
                                <span>{t('deliveryChallans.addItemBtn')}</span>
                            </button>
                        </section>

                        {/* ----- Bottom Section: Notes, Summary, Attachments ----- */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="dashboard-card">
                                    <label htmlFor="customerNotesDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.customerNotesLabel')}</label>
                                    <textarea id="customerNotesDc" value={customerNotes} onChange={e => setCustomerNotes(e.target.value)} rows="3" placeholder={t('deliveryChallans.customerNotesPlaceholder')} className="form-element"></textarea>
                                </div>
                                <div className="dashboard-card">
                                    <label htmlFor="termsConditionsDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.termsConditionsLabel')}</label>
                                    <textarea id="termsConditionsDc" value={termsConditions} onChange={e => setTermsConditions(e.target.value)} placeholder={t('deliveryChallans.termsConditionsPlaceholder')} rows="4" className="form-element"></textarea>
                                </div>
                            </div>

                            <div className="lg:col-span-1 dashboard-card space-y-3 font-sans text-sm">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-heading text-primary">{t('deliveryChallans.summary.totalQuantity')}:</span>
                                    <span className="font-heading text-primary font-bold">{totalQuantity}</span>
                                </div>
                                {/* Add other summary fields if needed for a challan */}
                            </div>
                        </section>

                        {/* File Attachments */}
                        <section className="dashboard-card">
                            <label className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.attachFilesLabel')}</label>
                            <input
                                type="file"
                                id="challan-files"
                                multiple
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                            />
                            <p className="text-xs text-secondary mt-1">{t('deliveryChallans.attachFilesHelp')}</p>
                            {attachedFiles.length > 0 && (
                                <div className="mt-2 text-xs text-secondary">
                                    <p>Selected: {attachedFiles.map(f => f.name).join(', ')}</p>
                                </div>
                            )}
                        </section>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                            <button type="button" onClick={() => console.log("Save as Draft clicked")} className="font-sans bg-background hover:bg-borderLight text-secondary px-6 py-3 rounded-lg shadow-sm border border-borderDefault transition-colors">
                                {t('deliveryChallans.saveAsDraftBtn')}
                            </button>
                            <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">
                                {t('deliveryChallans.saveAndSendBtn')}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DeliveryChallanCreatePage;