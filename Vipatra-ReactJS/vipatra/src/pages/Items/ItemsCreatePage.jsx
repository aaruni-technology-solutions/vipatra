// src/pages/Items/ItemsCreatePage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Using your theme's custom CSS classes like 'form-legend' and 'type-option'
import './ItemsForm.css'; 

const ItemsCreatePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // --- FORM STATE, EXPANDED FOR MORE DETAIL ---
    const [itemType, setItemType] = useState('product');
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [unit, setUnit] = useState('pcs');
    const [description, setDescription] = useState('');
    
    // Pricing
    const [sellingPrice, setSellingPrice] = useState('');
    const [purchasePrice, setPurchasePrice] = useState(''); // Product specific
    const [taxId, setTaxId] = useState('');

    // Codes
    const [hsnCode, setHsnCode] = useState(''); // Product specific
    const [sacCode, setSacCode] = useState(''); // Service specific

    // Inventory
    const [inventoryTracked, setInventoryTracked] = useState(true);
    const [quantityInStock, setQuantityInStock] = useState('');

    const handleItemTypeChange = (type) => {
        setItemType(type);
        if (type === 'service') {
            setInventoryTracked(false);
            setQuantityInStock('');
            setPurchasePrice('');
            setHsnCode('');
        } else {
            setInventoryTracked(true);
            setSacCode('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItemData = { 
            itemType, itemName, itemCode, unit, description, 
            sellingPrice, purchasePrice, taxId, 
            hsnCode, sacCode, 
            inventoryTracked, quantityInStock 
        };
        console.log("Saving New Item:", newItemData);
        alert('Item Saved!');
        navigate('/items');
    };

    return (
        <main className="flex flex-col h-full bg-background">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-background py-4 flex justify-between items-center border-b border-borderLight shadow-sm">
                <div className="px-6 sm:px-8">
                    <h2 className="text-3xl font-heading text-primary">{t('items.createItemTitle', 'Create Item')}</h2>
                    
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {/* REMOVED max-w-4xl to make the form wider, like the quote page */}
                <section className="dashboard-card">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* Section 1: Item Type */}
                        <fieldset>
                            <legend className="form-legend">{t('items.itemType', 'Item Type')}</legend>
                            <div className="flex space-x-4 pt-2">
                                <div className="type-option">
                                    <input type="radio" id="typeProduct" name="itemType" value="product" checked={itemType === 'product'} onChange={() => handleItemTypeChange('product')} />
                                    <label htmlFor="typeProduct">{t('items.product', 'Product')}</label>
                                </div>
                                <div className="type-option">
                                    <input type="radio" id="typeService" name="itemType" value="service" checked={itemType === 'service'} onChange={() => handleItemTypeChange('service')} />
                                    <label htmlFor="typeService">{t('items.service', 'Service')}</label>
                                </div>
                            </div>
                        </fieldset>

                        {/* Section 2: Main Details */}
                        <fieldset>
                            <legend className="form-legend">{t('items.mainDetails', 'Main Details')}</legend>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-2">
                                <div className="md:col-span-2">
                                    <label htmlFor="itemName" className="form-label">{t('items.itemName', 'Item Name')} <span className="text-red-500">*</span></label>
                                    <input type="text" id="itemName" value={itemName} onChange={e => setItemName(e.target.value)} className="form-element" required />
                                </div>
                                <div>
                                    <label htmlFor="unit" className="form-label">{t('items.unit', 'Unit')}</label>
                                    <input type="text" id="unit" value={unit} onChange={e => setUnit(e.target.value)} placeholder="e.g., pcs, kg, hrs" className="form-element" />
                                </div>
                                 <div>
                                    <label htmlFor="itemCode" className="form-label">{t('items.itemCode', 'Item Code / SKU')}</label>
                                    <input type="text" id="itemCode" value={itemCode} onChange={e => setItemCode(e.target.value)} className="form-element" />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="description" className="form-label">{t('items.description', 'Description')}</label>
                                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows="3" className="form-element"></textarea>
                                </div>
                            </div>
                        </fieldset>

                        {/* Section 3: Pricing */}
                        <fieldset>
                             <legend className="form-legend">{t('items.pricing', 'Pricing')}</legend>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-2">
                                <div>
                                    <label htmlFor="sellingPrice" className="form-label">{t('items.sellingPrice', 'Selling Price')} <span className="text-red-500">*</span></label>
                                    <input type="number" id="sellingPrice" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} placeholder="0.00" step="0.01" className="form-element" required/>
                                </div>
                                <div>
                                    <label htmlFor="taxId" className="form-label">{t('items.tax', 'Default Tax')}</label>
                                    <select id="taxId" value={taxId} onChange={e => setTaxId(e.target.value)} className="form-element">
                                        <option value="">{t('common.selectOption', 'Select a tax')}</option>
                                        <option value="1">GST @ 18%</option>
                                        <option value="2">GST @ 5%</option>
                                        <option value="3">Tax Exempt</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>

                        {/* --- CONDITIONAL SECTION FOR PRODUCTS --- */}
                        {itemType === 'product' && (
                            <fieldset>
                                <legend className="form-legend">{t('items.productDetails', 'Product Details')}</legend>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-2">
                                    <div>
                                        <label htmlFor="purchasePrice" className="form-label">{t('items.purchasePrice', 'Purchase Price')}</label>
                                        <input type="number" id="purchasePrice" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} placeholder="0.00" step="0.01" className="form-element" />
                                    </div>
                                    <div>
                                        <label htmlFor="hsnCode" className="form-label">{t('items.hsnCode', 'HSN Code')}</label>
                                        <input type="text" id="hsnCode" value={hsnCode} onChange={e => setHsnCode(e.target.value)} className="form-element" />
                                    </div>
                                    <div className="md:col-span-2 flex items-center space-x-3 mt-2">
                                        <input type="checkbox" id="inventoryTracked" checked={inventoryTracked} onChange={(e) => setInventoryTracked(e.target.checked)} className="form-checkbox h-4 w-4 text-accent rounded focus:ring-accent"/>
                                        <label htmlFor="inventoryTracked" className="text-sm font-medium text-primary">{t('items.trackInventory', 'Track inventory for this item')}</label>
                                    </div>
                                    {inventoryTracked && (
                                        <div>
                                            <label htmlFor="quantityInStock" className="form-label">{t('items.openingStock', 'Opening Stock')}</label>
                                            <input type="number" id="quantityInStock" value={quantityInStock} onChange={e => setQuantityInStock(e.target.value)} placeholder="0" className="form-element" />
                                        </div>
                                    )}
                                </div>
                            </fieldset>
                        )}
                        
                        {/* --- CONDITIONAL SECTION FOR SERVICES --- */}
                        {itemType === 'service' && (
                             <fieldset>
                                <legend className="form-legend">{t('items.serviceDetails', 'Service Details')}</legend>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pt-2">
                                     <div>
                                        <label htmlFor="sacCode" className="form-label">{t('items.sacCode', 'SAC Code')}</label>
                                        <input type="text" id="sacCode" value={sacCode} onChange={e => setSacCode(e.target.value)} className="form-element" />
                                    </div>
                                </div>
                            </fieldset>
                        )}
                        
                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-borderLight">
                            <button type="button" onClick={() => navigate(-1)} className="font-sans bg-cardBg hover:bg-borderLight text-secondary px-6 py-2.5 rounded-lg shadow-sm border border-borderLight transition-colors">
                                {t('common.cancel', 'Cancel')}
                            </button>
                            <button type="submit" className="font-sans bg-accent hover:bg-opacity-80 text-white px-6 py-2.5 rounded-lg shadow-soft transition-colors font-semibold">
                                {t('common.save', 'Save')}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default ItemsCreatePage;