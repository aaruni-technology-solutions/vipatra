// src/pages/Items/ItemsPage.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // If needed
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';

const ItemsListPage = () => {
    const { t } = useTranslation();
    const [showCreateForm, setShowCreateForm] = useState(false);

    // --- State for New Item Form ---
    const [itemType, setItemType] = useState('goods'); // 'goods' or 'service'
    const [itemName, setItemName] = useState('');
    const [itemUnit, setItemUnit] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [taxPreference, setTaxPreference] = useState('taxable');
    const [itemTaxRate, setItemTaxRate] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleShowCreateForm = () => setShowCreateForm(true);
    const handleHideCreateForm = () => {
        setShowCreateForm(false);
        // Optionally reset form fields here
        setItemName(''); setItemUnit(''); // etc.
        setSelectedFiles([]);
    };

    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-primary');
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            setSelectedFiles(Array.from(event.dataTransfer.files));
            // Clean up to allow re-dropping the same files if needed
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
            purchasePrice,
            taxPreference,
            taxRate: taxPreference === 'taxable' ? itemTaxRate : null,
            description: itemDescription,
            files: selectedFiles.map(file => file.name) // Just names for now
        };
        console.log("New Item Data:", newItemData);
        alert(t('items.newItemForm.itemSavedMsg', "Item saved (check console)!")); // Add this key to JSON
        handleHideCreateForm(); // Close form after submission
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar /> {/* Ensure "Manage Items" or similar is active */}
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                            <h2 className="text-3xl font-heading text-primary">{t('items.manageTitle')}</h2>
                            <p className="text-secondary font-sans mt-1">{t('items.manageSubtitle')}</p>
                        </div>
                        {!showCreateForm && ( // Only show Create Item button if form is not visible
                             <div className="mt-4 sm:mt-0">
                                <button
                                    id="showCreateItemFormBtn"
                                    onClick={handleShowCreateForm}
                                    className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>{t('items.createItemBtn')}</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Initial View / Item List Placeholder */}
                    {!showCreateForm && (
                        <div id="itemInitialView" className="dashboard-card">
                            <div className="text-center py-10">
                                <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 10h.01M17 17h.01M17 13h5a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2zm0 10h.01M7 13H2v5a2 2 0 002 2h5a2 2 0 002-2v-5H7z"></path></svg>
                                <h3 className="text-lg font-heading text-primary">{t('items.initialView.title')}</h3>
                                <p className="text-sm text-secondary font-sans">{t('items.initialView.subtitle')}</p>
                                <div className="mt-6 border border-borderDefault rounded-lg p-4 text-left">
                                    <p className="text-center text-secondary">{t('items.initialView.tablePlaceholder')}</p>
                                    {/* Actual item table would go here */}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Create Item Form */}
                    {showCreateForm && (
                        <div id="createItemFormContainer" className="mt-0"> {/* Removed mt-8 if it's the only thing visible */}
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
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label htmlFor="itemName" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.nameLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                        <input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} className="form-element" required/>
                                    </div>

                                    {/* Unit */}
                                    <div>
                                        <label htmlFor="itemUnit" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.unitLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                        <input type="text" id="itemUnit" value={itemUnit} onChange={(e) => setItemUnit(e.target.value)} placeholder={t('items.newItemForm.unitPlaceholder')} className="form-element" required/>
                                        <p className="text-xs text-secondary mt-1">{t('items.newItemForm.unitExamples')}</p>
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.imageLabel')}</label>
                                        <div
                                            className="file-input-area"
                                            id="dropzone"
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                        >
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="sellingPrice" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.sellingPriceLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label>
                                                <input type="number" id="sellingPrice" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required/>
                                            </div>
                                            <div>
                                                <label htmlFor="purchasePrice" className="block text-sm font-medium text-primary mb-1 font-sans">{t('items.newItemForm.purchasePriceLabel')}</label>
                                                <input type="number" id="purchasePrice" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="0.00" step="0.01" className="form-element" />
                                                <p className="text-xs text-secondary mt-1">{t('items.newItemForm.purchasePriceHelp')}</p>
                                            </div>
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
                                        {taxPreference === 'taxable' && ( // Conditionally show tax rate section
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
            </div>
            <Footer />
        </div>
    );
};

export default ItemsListPage;