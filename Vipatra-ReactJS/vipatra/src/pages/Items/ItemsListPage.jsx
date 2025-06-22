import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';
import './ItemsForm.css';

// ADDED: Mock data to display in the list. In a real app, this would come from an API.
const dummyItems = [
    { id: 1, type: 'goods', name: 'Wireless ergonomic mouse', unit: 'pcs', sellingPrice: 2499.00, purchasePrice: 1600.00 },
    { id: 2, type: 'goods', name: 'Mechanical keyboard RGB', unit: 'pcs', sellingPrice: 5999.00, purchasePrice: 4200.00 },
    { id: 3, type: 'service', name: 'Website design consultation', unit: 'hrs', sellingPrice: 4500.00, purchasePrice: null },
    { id: 4, type: 'service', name: 'Cloud setup service', unit: 'project', sellingPrice: 25000.00, purchasePrice: null },
    { id: 5, type: 'subscription', name: 'Pro software license', unit: 'license', sellingPrice: 1999.00, purchasePrice: null },
    { id: 6, type: 'subscription', name: 'Cloud storage plan (1TB)', unit: 'plan', sellingPrice: 899.00, purchasePrice: null },
    { id: 7, type: 'goods', name: '4K monitor 27-inch', unit: 'pcs', sellingPrice: 28000.00, purchasePrice: 21500.00 },
    { id: 8, type: 'service', name: 'Annual maintenance contract', unit: 'year', sellingPrice: 15000.00, purchasePrice: null },
];

const ItemsListPage = () => {
    const { t } = useTranslation();
    const { itemTypeUrlParam } = useParams();

    // ADDED: State to hold the list of items
    const [items, setItems] = useState(dummyItems);

    const [showCreateForm, setShowCreateForm] = useState(false);
    // Form states
    const [itemType, setItemType] = useState('goods');
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
    const [numberOfBillingCycles, setNumberOfBillingCycles] = useState('');
    const [neverExpires, setNeverExpires] = useState(true);
    const [trialPeriodDays, setTrialPeriodDays] = useState('');
    const [setupFee, setSetupFee] = useState('');
    const [autoRenew, setAutoRenew] = useState(false);

    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        if (itemTypeUrlParam) {
            const normalizedType = itemTypeUrlParam.toLowerCase();
            // Map URL param 'products' to internal type 'goods'
            if (normalizedType === 'products') {
                setFilterType('goods');
            } else if (['service', 'subscription'].includes(normalizedType)) {
                setFilterType(normalizedType);
            } else {
                setFilterType('');
            }
        } else {
            setFilterType('');
        }
    }, [itemTypeUrlParam]);
    
    // ADDED: Logic to filter items based on the current filterType state
    const filteredItems = items.filter(item => {
        if (!filterType) return true; // Show all if no filter is set
        return item.type === filterType;
    });

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
        if (fileInputRef.current) fileInputRef.current.value = "";

        setBillingCycle('monthly');
        setBillingFrequency(1);
        setNumberOfBillingCycles('');
        setNeverExpires(true);
        setTrialPeriodDays('');
        setSetupFee('');
        setAutoRenew(false);
    };

    const handleShowCreateForm = (preselectedType) => {
        resetFormFields();
        if (preselectedType && ['goods', 'service', 'subscription'].includes(preselectedType)) {
            setItemType(preselectedType);
        } else {
            setItemType('goods');
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
            if (fileInputRef.current) fileInputRef.current.files = event.dataTransfer.files;
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
            id: Date.now(), // Use a temporary unique ID
            type: itemType,
            name: itemName,
            unit: itemUnit,
            sellingPrice: parseFloat(sellingPrice),
            purchasePrice: itemType === 'goods' ? parseFloat(purchasePrice) : null,
            // ... all other fields
        };
        // ADDED: Add the new item to the state to update the list
        setItems(prevItems => [newItemData, ...prevItems]);

        console.log("New Item Data:", newItemData);
        alert(t('items.newItemForm.itemSavedMsg'));
        handleHideCreateForm();
    };
    
    const getPageTitle = () => {
        // CHANGED: Simplified this to use the internal filterType for consistency
        switch (filterType) {
            case 'goods':
                return t('items.allProductsTitle', 'All Products');
            case 'service':
                return t('items.allServicesTitle', 'All Services');
            case 'subscription':
                return t('items.allSubscriptionsTitle', 'All Subscriptions');
            default:
                return t('items.allItemsTitle', 'All Items');
        }
    };

    // ADDED: Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
    };

    return (
        <main className="p-6 sm:p-8">

            {!showCreateForm ? (
                <>
                    {/* 
                      CHANGED: Wrapped ActionHeader in a div to make it sticky.
                      - `sticky top-0 z-10`: Makes the header stick to the top of the scrollable area.
                      - `bg-background`: Ensures content doesn't show through when scrolling.
                      - `-mx-6 sm:-mx-8 px-6 sm:px-8`: A common trick to make the background span the full width,
                        breaking out of the parent's padding, while keeping the content aligned.
                      - `py-4 border-b`: Adds padding and a bottom border for visual separation.
                    */}
                    <div className="sticky top-0 z-10 bg-background -mx-6 sm:-mx-8 px-6 sm:px-8 py-4 border-b border-borderLight mb-6">
                        <ActionHeader 
                            title={getPageTitle()}
                            onNewClick={() => handleShowCreateForm(filterType || 'goods')}
                        />
                    </div>

                    {/* 
                      CHANGED: Replaced the placeholder with a conditional rendering.
                      It shows the table if there are items, otherwise it shows the initial empty view.
                    */}
                    {filteredItems.length > 0 ? (
                        <div id="itemListContainer" className="dashboard-card overflow-x-auto">
                            <table className="w-full text-left font-sans">
                                <thead className="text-sm text-secondary border-b border-borderDefault">
                                    <tr>
                                        <th className="p-4">ITEM</th>
                                        <th className="p-4">TYPE</th>
                                        <th className="p-4 text-right">SELLING PRICE</th>
                                        <th className="p-4 text-right">PURCHASE PRICE</th>
                                        <th className="p-4 text-center">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredItems.map(item => (
                                        <tr key={item.id} className="border-b border-borderLight hover:bg-background transition-colors">
                                            <td className="p-4 text-primary font-medium">{item.name}</td>
                                            <td className="p-4 capitalize">{item.type}</td>
                                            <td className="p-4 text-right">{formatCurrency(item.sellingPrice)}</td>
                                            <td className="p-4 text-right text-secondary">
                                                {item.type === 'goods' ? formatCurrency(item.purchasePrice) : 'N/A'}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button className="text-primary hover:text-primary-dark p-1">Edit</button>
                                                <button className="text-danger-DEFAULT hover:text-danger-dark p-1 ml-2">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div id="itemInitialView" className="dashboard-card">
                            <div className="text-center py-10">
                                <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 10h.01M17 17h.01M17 13h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2zm0 10h.01M7 13H2v5a2 2 0 002 2h5a2 2 0 002-2v-5H7z"></path></svg>
                                <h3 className="text-lg font-heading text-primary">
                                    No items to display
                                </h3>
                                <p className="text-sm text-secondary font-sans">Click 'New' to add your first item.</p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div id="createItemFormContainer" className="mt-0">
                    <section className="dashboard-card">
                        {/* The entire form section remains the same as your original code */}
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
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.imageLabel')}</label>
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
                                <div>
                                    <label htmlFor="sellingPrice" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.sellingPriceLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                    <input type="number" id="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required/>
                                </div>
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-primary mb-2 font-sans">{t('items.newItemForm.taxPreferenceLabel')}</label>
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