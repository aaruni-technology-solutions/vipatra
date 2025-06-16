// src/pages/Items/ItemsListPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader'; // This component remains as it is part of the page content
import './ItemsForm.css'; 

const ItemsListPage = () => {
    const { t } = useTranslation();
    const { itemTypeUrlParam } = useParams(); // Get type from URL, e.g., "products", "services"

    const [showCreateForm, setShowCreateForm] = useState(false);
    // Form states
    const [itemType, setItemType] = useState('goods'); // Default for new item form
    const [itemName, setItemName] = useState('');
    const [itemUnit, setItemUnit] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [taxPreference, setTaxPreference] = useState('taxable');
    const [itemTaxRate, setItemTaxRate] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    // Subscription specific states
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [billingFrequency, setBillingFrequency] = useState(1);
    const [numberOfBillingCycles, setNumberOfBillingCycles] = useState(''); // Empty for 'never expires'
    const [neverExpires, setNeverExpires] = useState(true);
    const [trialPeriodDays, setTrialPeriodDays] = useState('');
    const [setupFee, setSetupFee] = useState('');
    const [autoRenew, setAutoRenew] = useState(false);


    // State for filtering the list view based on URL param
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        if (itemTypeUrlParam) {
            const normalizedType = itemTypeUrlParam.toLowerCase();
            setFilterType(normalizedType);
            // If you want the "Create Item" form to pre-select this type when landing on /items/products (for example)
            // And potentially open the form directly if the intent is to create that specific type.
            // This part is optional depending on desired UX.
            // setItemType(normalizedType);
            // setShowCreateForm(true);
        } else {
            setFilterType(''); // Show all items if no type in URL
        }
    }, [itemTypeUrlParam]);

    const resetFormFields = () => {
        setItemType('goods');
        setItemName('');
        setItemUnit('');
        setSellingPrice('');
        setPurchasePrice('');
        setTaxPreference('taxable');
        setItemTaxRate('');
        setItemDescription('');
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input

        // Reset subscription fields
        setBillingCycle('monthly');
        setBillingFrequency(1);
        setNumberOfBillingCycles('');
        setNeverExpires(true);
        setTrialPeriodDays('');
        setSetupFee('');
        setAutoRenew(false);
    };


    const handleShowCreateForm = (preselectedType) => {
        resetFormFields(); // Reset form before showing
        if (preselectedType && ['goods', 'service', 'subscription'].includes(preselectedType)) {
            setItemType(preselectedType);
        } else {
            setItemType('goods'); // Default if no valid type or opening generally
        }
        setShowCreateForm(true);
    };

    const handleHideCreateForm = () => {
        setShowCreateForm(false);
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
            if (fileInputRef.current) fileInputRef.current.files = event.dataTransfer.files; // For controlled component behavior
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

    const handleNewItemSubmit = (e) => {
        e.preventDefault();
        const newItemData = {
            type: itemType,
            name: itemName,
            unit: itemUnit,
            sellingPrice,
            purchasePrice: itemType === 'goods' ? purchasePrice : undefined, // Only for goods
            taxPreference,
            taxRate: taxPreference === 'taxable' ? itemTaxRate : null,
            description: itemDescription,
            files: selectedFiles.map(file => file.name),
            // Subscription details (only if itemType is 'subscription')
            ...(itemType === 'subscription' && {
                billingCycle,
                billingFrequency,
                numberOfBillingCycles: neverExpires ? null : numberOfBillingCycles, // null for never expires
                trialPeriodDays,
                setupFee,
                autoRenew,
            }),
        };
        console.log("New Item Data:", newItemData);
        alert(t('items.newItemForm.itemSavedMsg'));
        handleHideCreateForm();
    };
    const getPageTitle = () => {
        switch (filterType) {
            case 'products':
                return t('items.allProductsTitle', 'All Products');
            case 'services':
                return t('items.allServicesTitle', 'All Services');
            case 'subscriptions':
                return t('items.allSubscriptionsTitle', 'All Subscriptions');
            default:
                return t('items.allItemsTitle', 'All Items');
        }
    };

    return (
        <main className="p-6 sm:p-8">

            {!showCreateForm ? (
                // This block shows when you are viewing the list
                <>
                    {/* 1. Add the new ActionHeader component here */}
                    <ActionHeader 
                        title={getPageTitle()}
                        onNewClick={() => handleShowCreateForm(filterType || 'goods')}
                    />

                    {/* 2. Your existing list view */}
                    <div id="itemInitialView" className="dashboard-card">
                        <div className="text-center py-10">
                            <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 10h.01M17 17h.01M17 13h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2zm0 10h.01M7 13H2v5a2 2 0 002 2h5a2 2 0 002-2v-5H7z"></path></svg>
                            <h3 className="text-lg font-heading text-primary">
                                {filterType === 'products' ? t('items.showingProducts', 'Showing Products') :
                                 filterType === 'services' ? t('items.showingServices', 'Showing Services') :
                                 filterType === 'subscriptions' ? t('items.showingSubscriptions', 'Showing Subscriptions') :
                                 t('items.initialView.title')}
                            </h3>
                            <p className="text-sm text-secondary font-sans">{t('items.initialView.subtitle')}</p>
                            <div className="mt-6 border border-borderDefault rounded-lg p-4 text-left">
                                <p className="text-center text-secondary">{t('items.initialView.tablePlaceholder')}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (

         
                <div id="createItemFormContainer" className="mt-0">
                    <section className="dashboard-card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-heading text-primary">{t('items.newItemForm.title')}</h3>
                            <button onClick={handleHideCreateForm} className="text-secondary hover:text-danger-DEFAULT transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <form onSubmit={handleNewItemSubmit} className="space-y-6">
                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-primary mb-2 font-sans">{t('items.newItemForm.typeLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                <div className="flex space-x-4">
                                    <div className="type-option">
                                        <input type="radio" id="typeGoods" name="itemType" value="goods" checked={itemType === 'goods'} onChange={(e) => setItemType(e.target.value)} />
                                        <label htmlFor="typeGoods">{t('items.newItemForm.goods')}</label>
                                    </div>
                                    <div className="type-option">
                                        <input type="radio" id="typeService" name="itemType" value="service" checked={itemType === 'service'} onChange={(e) => setItemType(e.target.value)} />
                                        <label htmlFor="typeService">{t('items.newItemForm.service')}</label>
                                    </div>
                                    <div className="type-option">
                                        <input type="radio" id="typeSubscription" name="itemType" value="subscription" checked={itemType === 'subscription'} onChange={(e) => setItemType(e.target.value)} />
                                        <label htmlFor="typeSubscription">{t('items.newItemForm.subscription')}</label>
                                    </div>
                                </div>
                            </div>

                            {/* Common Fields: Name, Unit */}
                            <div>
                                <label htmlFor="itemName" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.nameLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} className="form-element" required/>
                            </div>
                            <div>
                                <label htmlFor="itemUnit" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.unitLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                <input type="text" id="itemUnit" value={itemUnit} onChange={(e) => setItemUnit(e.target.value)} placeholder={t('items.newItemForm.unitPlaceholder')} className="form-element" required/>
                                <p className="text-xs text-secondary mt-1">{t('items.newItemForm.unitExamples')}</p>
                            </div>

                            {/* Conditional Fields for Goods */}
                            {itemType === 'goods' && (
                                <fieldset className="border-t border-borderLight pt-6 mt-6">
                                    <legend className="text-lg font-heading text-primary -mt-3 mb-4 px-2 bg-cardBg inline-block">{t('items.newItemForm.goodsSpecificLegend')}</legend>
                                    <div className="space-y-6">
                                        {/* ... SKU, Track Inventory etc. fields for goods ... */}
                                        <div>
                                            <label htmlFor="purchasePriceGoods" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.purchasePriceLabel')}</label>
                                            <input type="number" id="purchasePriceGoods" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="0.00" step="0.01" className="form-element" />
                                            <p className="text-xs text-secondary mt-1">{t('items.newItemForm.purchasePriceHelp')}</p>
                                        </div>
                                    </div>
                                </fieldset>
                            )}

                            {/* Conditional Fields for Services (Example) */}
                            {itemType === 'service' && (
                                <fieldset className="border-t border-borderLight pt-6 mt-6">
                                    <legend className="text-lg font-heading text-primary -mt-3 mb-4 px-2 bg-cardBg inline-block">{t('items.newItemForm.serviceSpecificLegend')}</legend>
                                    {/* Add service specific fields like duration, etc. */}
                                    <p className="text-sm text-secondary">{t('items.newItemForm.serviceFieldsPlaceholder', 'Service-specific fields will go here (e.g., Duration).')}</p>
                                </fieldset>
                            )}

                            {/* Conditional Fields for Subscriptions */}
                            {itemType === 'subscription' && (
                                <fieldset className="border-t border-borderLight pt-6 mt-6">
                                    <legend className="text-lg font-heading text-primary -mt-3 mb-4 px-2 bg-cardBg inline-block">{t('items.newItemForm.subscriptionSpecificLegend')}</legend>
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="billingCycle" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.billingCycleLabel')}</label>
                                            <select id="billingCycle" value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)} className="form-element">
                                                <option value="daily">{t('cycles.daily')}</option>
                                                <option value="weekly">{t('cycles.weekly')}</option>
                                                <option value="monthly">{t('cycles.monthly')}</option>
                                                <option value="quarterly">{t('cycles.quarterly')}</option>
                                                <option value="yearly">{t('cycles.yearly')}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="billingFrequency" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.billingFrequencyLabel', 'Billing Frequency (e.g., every X cycles)')}</label>
                                            <input type="number" id="billingFrequency" value={billingFrequency} onChange={(e) => setBillingFrequency(parseInt(e.target.value) || 1)} min="1" className="form-element" />
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <input type="checkbox" id="neverExpires" checked={neverExpires} onChange={(e) => setNeverExpires(e.target.checked)} className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"/>
                                            <label htmlFor="neverExpires" className="text-sm font-medium text-primary font-sans">{t('items.newItemForm.neverExpires', 'Never Expires')}</label>
                                        </div>
                                        {!neverExpires && (
                                            <div>
                                                <label htmlFor="numberOfBillingCycles" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.numberOfBillingCycles', 'Number of Billing Cycles')}</label>
                                                <input type="number" id="numberOfBillingCycles" value={numberOfBillingCycles} onChange={(e) => setNumberOfBillingCycles(parseInt(e.target.value) || '')} min="1" className="form-element" />
                                            </div>
                                        )}
                                        <div>
                                            <label htmlFor="trialPeriodDays" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.trialPeriodDays', 'Trial Period (Days)')}</label>
                                            <input type="number" id="trialPeriodDays" value={trialPeriodDays} onChange={(e) => setTrialPeriodDays(parseInt(e.target.value) || '')} min="0" placeholder="0 for no trial" className="form-element" />
                                        </div>
                                        <div>
                                            <label htmlFor="setupFee" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.setupFee', 'Setup Fee (INR, Optional)')}</label>
                                            <input type="number" id="setupFee" value={setupFee} onChange={(e) => setSetupFee(e.target.value)} placeholder="0.00" step="0.01" className="form-element" />
                                        </div>
                                         <div className="flex items-center space-x-3">
                                            <input type="checkbox" id="autoRenew" checked={autoRenew} onChange={(e) => setAutoRenew(e.target.checked)} className="form-checkbox h-4 w-4 text-primary rounded focus:ring-primary"/>
                                            <label htmlFor="autoRenew" className="text-sm font-medium text-primary font-sans">{t('items.newItemForm.autoRenew', 'Auto-renew subscription')}</label>
                                        </div>
                                    </div>
                                </fieldset>
                            )}


                            {/* Image Upload */}
                            <div> {/* Moved image upload to after type-specific sections if preferred */}
                                <label className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.imageLabel')}</label>
                                {/* ... your existing file input area JSX ... */}
                                <div className="file-input-area" id="dropzone" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-secondary" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        <div className="flex text-sm text-secondary justify-center">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-cardBg rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent px-1">
                                                <span>{t('items.newItemForm.uploadFile')}</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} ref={fileInputRef} />
                                            </label>
                                            <p className="pl-1">{t('items.newItemForm.dragAndDrop')}</p>
                                        </div>
                                        <p className="text-xs text-secondary">{t('items.newItemForm.fileTypes')}</p>
                                    </div>
                                </div>
                                <div id="file-list" className="mt-2 text-sm text-secondary">
                                    {selectedFiles.length > 0 ? selectedFiles.map(file => file.name).join(', ') : t('items.newItemForm.noFileChosen')}
                                </div>
                            </div>

                            {/* Pricing & Taxation Fieldset */}
                            <fieldset className="border-t border-borderLight pt-6">
                                <legend className="text-lg font-heading text-primary -mt-3 mb-4 px-2 bg-cardBg inline-block">{t('items.newItemForm.pricingTaxationLegend')}</legend>
                                {/* Selling Price */}
                                <div> {/* Moved selling price here as it's part of pricing */}
                                    <label htmlFor="sellingPrice" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.sellingPriceLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                    <input type="number" id="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required/>
                                </div>
                                {/* Tax Preference and Default Tax Rate (already good) */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-primary mb-2 font-sans">{t('items.newItemForm.taxPreferenceLabel')}</label>
                                    {/* ... tax preference radio buttons ... */}
                                    <div className="flex space-x-4">
                                        <div className="type-option">
                                            <input type="radio" id="taxableItem" name="taxPreference" value="taxable" checked={taxPreference === 'taxable'} onChange={(e) => setTaxPreference(e.target.value)} />
                                            <label htmlFor="taxableItem">{t('items.newItemForm.taxable')}</label>
                                        </div>
                                        <div className="type-option">
                                            <input type="radio" id="taxExemptItem" name="taxPreference" value="exempt" checked={taxPreference === 'exempt'} onChange={(e) => setTaxPreference(e.target.value)} />
                                            <label htmlFor="taxExemptItem">{t('items.newItemForm.taxExempt')}</label>
                                        </div>
                                    </div>
                                </div>
                                {taxPreference === 'taxable' && (
                                    <div id="taxRateSection" className="mt-6">
                                        <label htmlFor="itemTaxRate" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.defaultTaxRateLabel')}</label>
                                        {/* ... tax rate select ... */}
                                        <select id="itemTaxRate" name="itemTaxRate" value={itemTaxRate} onChange={(e) => setItemTaxRate(e.target.value)} className="form-element">
                                            <option value="">{t('items.newItemForm.noDefaultTaxOption')}</option>
                                            <option value="gst_0">{t('items.newItemForm.gst0')}</option>
                                            <option value="gst_5">{t('items.newItemForm.gst5')}</option>
                                            <option value="gst_12">{t('items.newItemForm.gst12')}</option>
                                            <option value="gst_18">{t('items.newItemForm.gst18')}</option>
                                            <option value="gst_28">{t('items.newItemForm.gst28')}</option>
                                            <option value="custom_tax_1">{t('items.newItemForm.customTaxExample')}</option>
                                        </select>
                                        <p className="text-xs text-secondary mt-1">{t('items.newItemForm.defaultTaxRateHelp')}</p>
                                    </div>
                                )}
                            </fieldset>

                            {/* Description */}
                            <div className="border-t border-borderLight pt-6">
                                <label htmlFor="itemDescription" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.descriptionLabel')}</label>
                                <textarea id="itemDescription" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} rows="3" className="form-element"></textarea>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={handleHideCreateForm} className="font-sans bg-background hover:bg-borderLight text-secondary px-6 py-3 rounded-lg shadow-sm border border-borderDefault transition-colors">{t('common.cancel')}</button>
                                <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">{t('items.newItemForm.saveItemBtn')}</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
};

export default ItemsListPage;