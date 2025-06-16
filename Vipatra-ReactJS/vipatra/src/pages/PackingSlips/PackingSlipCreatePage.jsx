// src/pages/PackingSlips/PackingSlipCreatePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/common/Alert';

const initialSlipItem = { id: Date.now(), itemName: '', itemSku: '', itemQtyShipped: 1 };

const PackingSlipCreatePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Form State
    const [basedOnInvoiceNo, setBasedOnInvoiceNo] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [packingSlipNo, setPackingSlipNo] = useState(''); // Could be auto-generated
    const [shippingDate, setShippingDate] = useState(new Date().toISOString().slice(0, 10));
    const [itemsToShip, setItemsToShip] = useState([{ ...initialSlipItem }]);
    const [notes, setNotes] = useState('');
    const [orderNo, setOrderNo] = useState('');
    const [carrier, setCarrier] = useState('');
    const [trackingNo, setTrackingNo] = useState('');


    const [formAlert, setFormAlert] = useState(null);

    const handleLoadItemsFromInvoice = () => {
        if (!basedOnInvoiceNo) {
            setFormAlert({ type: 'warning', message: t('alerts.enterInvoiceToLoad', 'Please enter an Invoice # to load items.') }); // Add to JSON
            return;
        }
        console.log("Loading items for Invoice #", basedOnInvoiceNo);
        // Dummy load - In real app, fetch invoice items and populate itemsToShip
        setItemsToShip([
            { id: Date.now() + 1, itemName: "Product A from " + basedOnInvoiceNo, itemSku: "SKU001", itemQtyShipped: 2 },
            { id: Date.now() + 2, itemName: "Service B from " + basedOnInvoiceNo, itemSku: "SVC002", itemQtyShipped: 1 },
        ]);
        setFormAlert({ type: 'success', message: t('alerts.itemsLoaded', 'Items loaded from invoice (dummy data).') }); // Add to JSON
    };


    const handleItemChange = (index, field, value) => {
        const updatedItems = [...itemsToShip];
        updatedItems[index][field] = value;
        setItemsToShip(updatedItems);
    };

    const addItemRow = () => {
        setItemsToShip([...itemsToShip, { ...initialSlipItem, id: Date.now() }]);
    };

    const removeItemRow = (index) => {
        if (itemsToShip.length > 0) {
            const updatedItems = itemsToShip.filter((_, i) => i !== index);
            setItemsToShip(updatedItems);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormAlert(null);
        if (itemsToShip.length === 0) {
            setFormAlert({ type: 'error', message: t('alerts.addAtLeastOneItem', 'Please add at least one item to ship.') }); // Add to JSON
            return;
        }

        const packingSlipData = {
            packingSlipNo: packingSlipNo || `PS-${Date.now()}`,
            shippingDate,
            basedOnInvoiceNo,
            customerName,
            shippingAddress,
            orderNo,
            carrier,
            trackingNo,
            items: itemsToShip,
            notes,
        };
        console.log("Packing Slip Data:", packingSlipData);
        alert(t('packingSlip.alertFormSubmitted'));
        // In a real app, save this data and then navigate to a preview/view page
        // navigate(`/packing-slips/view/${packingSlipData.packingSlipNo}`, { state: { packingSlipData } }); // Pass data to preview
    };


    useEffect(() => {
        document.title = t('packingSlip.pageTitleCreate');
    }, [t]);


    return (
        <main className="p-6 sm:p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-heading text-primary">{t('packingSlip.pageTitleCreate')}</h2>
                <p className="text-secondary font-sans mt-1">{t('packingSlip.pageSubtitle')}</p>
            </div>

            {formAlert && (
                <div className="mb-6">
                    <Alert type={formAlert.type} message={formAlert.message} onClose={() => setFormAlert(null)} />
                </div>
            )}

            <form onSubmit={handleSubmit} className="dashboard-card space-y-8">
                {/* Section 1: Basic Info & Customer */}
                <fieldset>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="basedOnInvoiceNo" className="block text-sm font-medium text-primary mb-1 font-sans">{t('packingSlip.basedOnInvoiceLabel')}</label>
                            <div className="flex">
                                <input type="text" id="basedOnInvoiceNo" value={basedOnInvoiceNo} onChange={e => setBasedOnInvoiceNo(e.target.value)} placeholder={t('packingSlip.invoiceNoPlaceholder')} className="form-element rounded-r-none" />
                                <button type="button" onClick={handleLoadItemsFromInvoice} className="bg-accent hover:bg-accent-dark text-textDark px-4 py-2 rounded-r-lg text-sm font-semibold whitespace-nowrap">{t('packingSlip.loadItemsBtn')}</button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="customerName" className="block text-sm font-medium text-primary mb-1 font-sans">{t('packingSlip.customerNameLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <input type="text" id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} className="form-element" required />
                        </div>
                        <div>
                            <label htmlFor="packingSlipNo" className="block text-sm font-medium text-primary mb-1 font-sans">{t('packingSlip.packingSlipNoLabel')}</label>
                            <input type="text" id="packingSlipNo" value={packingSlipNo} onChange={e => setPackingSlipNo(e.target.value)} placeholder={t('packingSlip.packingSlipNoPlaceholder')} className="form-element" />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="shippingAddress" className="block text-sm font-medium text-primary mb-1 font-sans">{t('packingSlip.shippingAddressLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <textarea id="shippingAddress" value={shippingAddress} onChange={e => setShippingAddress(e.target.value)} rows="3" placeholder={t('packingSlip.shippingAddressPlaceholder')} className="form-element" required></textarea>
                        </div>
                        <div>
                            <label htmlFor="shippingDate" className="block text-sm font-medium text-primary mb-1 font-sans">{t('packingSlip.shippingDateLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                            <input type="date" id="shippingDate" value={shippingDate} onChange={e => setShippingDate(e.target.value)} className="form-element" required />
                        </div>
                    </div>
                </fieldset>

                {/* Section 2: Shipping Details (Optional) */}
                    <fieldset>
                    <legend className="text-xl font-heading text-primary mb-4 border-b border-borderLight pb-2">{t('common.shippingDetails', 'Shipping Details')}</legend> {/* Add key */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="orderNo" className="block text-sm font-medium text-primary mb-1 font-sans">{t('packingSlip.orderNoLabel')}</label>
                            <input type="text" id="orderNo" value={orderNo} onChange={e => setOrderNo(e.target.value)} className="form-element" />
                        </div>
                        <div>
                            <label htmlFor="carrier" className="block text-sm font-medium text-primary mb-1 font-sans">{t('packingSlip.carrierLabel')}</label>
                            <input type="text" id="carrier" value={carrier} onChange={e => setCarrier(e.target.value)} className="form-element" />
                        </div>
                        <div>
                            <label htmlFor="trackingNo" className="block text-sm font-medium text-primary mb-1 font-sans">{t('packingSlip.trackingNoLabel')}</label>
                            <input type="text" id="trackingNo" value={trackingNo} onChange={e => setTrackingNo(e.target.value)} className="form-element" />
                        </div>
                    </div>
                </fieldset>


                {/* Section 3: Items to Ship */}
                <fieldset>
                    <legend className="text-xl font-heading text-primary mb-4 border-b border-borderLight pb-2">{t('packingSlip.itemsToShip')}</legend>
                    <div id="packingSlipItemsContainer" className="space-y-4">
                        {itemsToShip.map((item, index) => (
                            <div key={item.id} className="item-row grid grid-cols-12 gap-x-3 gap-y-2 items-center p-3 bg-background rounded-lg">
                                <div className="col-span-12 sm:col-span-6">
                                    <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('packingSlip.itemNameLabel')}</label>
                                    <input type="text" name="itemName" value={item.itemName} onChange={(e) => handleItemChange(index, 'itemName', e.target.value)} placeholder={t('items.newItemForm.itemPlaceholder', 'Item or Service Description')} className="form-element !p-2 text-sm" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('packingSlip.itemSkuLabel')}</label>
                                    <input type="text" name="itemSku" value={item.itemSku} onChange={(e) => handleItemChange(index, 'itemSku', e.target.value)} placeholder="SKU" className="form-element !p-2 text-sm" />
                                </div>
                                <div className="col-span-4 sm:col-span-2">
                                    <label className="block text-xs font-medium text-primary mb-0.5 font-sans">{t('packingSlip.itemQtyLabel')}</label>
                                    <input type="number" name="itemQtyShipped" value={item.itemQtyShipped} onChange={(e) => handleItemChange(index, 'itemQtyShipped', e.target.value)} min="1" className="form-element !p-2 text-sm" />
                                </div>
                                <div className="col-span-2 sm:col-span-1 flex justify-end items-center">
                                    <button type="button" className="text-danger-DEFAULT hover:text-danger-dark p-1 mt-4 sm:mt-0" onClick={() => removeItemRow(index)}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addItemRow} className="mt-4 font-sans text-sm bg-primary/80 hover:bg-primary text-textOnPrimary px-4 py-2 rounded-lg shadow-soft transition-colors duration-200 flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        <span>{t('packingSlip.addItemBtn')}</span>
                    </button>
                </fieldset>

                {/* Section 4: Notes */}
                <fieldset>
                    <legend className="text-xl font-heading text-primary mb-4 border-b border-borderLight pb-2">{t('packingSlip.notesLabel')}</legend>
                    <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows="3" placeholder={t('packingSlip.notesPlaceholder')} className="form-element"></textarea>
                </fieldset>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-borderLight mt-6">
                    <button
                        type="button"
                        onClick={() => { /* Implement Preview Logic */ console.log("Preview Packing Slip Clicked"); alert("Preview functionality to be implemented."); }}
                        className="font-sans bg-secondary hover:bg-secondary/80 text-textOnSecondary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                        {/* <svg className="w-5 h-5" ... > Preview Icon </svg> */}
                        <span>{t('packingSlip.previewSlipBtn')}</span>
                    </button>
                    <button
                        type="submit"
                        className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span>{t('packingSlip.generateAndSendBtn')}</span>
                    </button>
                </div>
            </form>
        </main>
    );
};

export default PackingSlipCreatePage;