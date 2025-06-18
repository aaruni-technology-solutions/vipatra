// src/pages/DeliveryChallans/DeliveryChallanCreatePage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';

const initialLineItem = { id: Date.now(), itemDetails: '', quantity: 1, description: '' };

const DeliveryChallanCreatePage = () => {
    const { t } = useTranslation();

    // --- All your state and logic remains the same ---
    const [customerName, setCustomerName] = useState('');
    const [challanNo, setChallanNo] = useState('DC-00001');
    const [referenceNo, setReferenceNo] = useState('');
    const [challanDate, setChallanDate] = useState(new Date().toISOString().slice(0, 10));
    const [challanType, setChallanType] = useState('');
    const [lineItems, setLineItems] = useState([{ ...initialLineItem }]);
    const [customerNotes, setCustomerNotes] = useState('');
    const [termsConditions, setTermsConditions] = useState('');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [totalQuantity, setTotalQuantity] = useState(0);

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
           if (fileInputRef.current) fileInputRef.current.value = "";
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
           const challanData = { customerName, challanNo, referenceNo, challanDate, challanType, items: lineItems, customerNotes, termsConditions, attachedFiles, totalQuantity };
           console.log("Delivery Challan Data:", challanData);
           alert(t('common.formSubmitted'));
       };
   
    const challanTypes = [
        { value: "jobWork", labelKey: "deliveryChallans.types.jobWork" },
        { value: "supplyOnApproval", labelKey: "deliveryChallans.types.supplyOnApproval" },
        { value: "supplyLiquidGas", labelKey: "deliveryChallans.types.supplyLiquidGas" },
        { value: "others", labelKey: "deliveryChallans.types.others" },
    ];

    return (
        // 1. THE PERFECT PAGE LAYOUT
        <main className="flex flex-col h-full bg-background">
            
            {/* 2. THE STICKY HEADER BLOCK */}
            <div className="sticky top-0 z-10 bg-background px-6 sm:px-8 pt-4 pb-6">
                <h2 className="text-3xl font-heading text-primary">{t('deliveryChallans.pageTitle')}</h2>
            </div>
            
            {/* 3. THE SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8">
                <section className="dashboard-card">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* ALL YOUR FORM SECTIONS ARE HERE, UNCHANGED */}

                        {/* Section 1: Customer & Challan Basic Info */}
                        <div>
                        <h3 className="form-legend">{t('deliveryChallans.customerAndChallanInfoTitle', 'Customer & Challan Details')}</h3> {/* New Key */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                            <div>
                                <label htmlFor="customerNameDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.customerNameLabel')}</label>
                                <input type="text" id="customerNameDc" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder={t('deliveryChallans.customerNamePlaceholder')} className="form-element" />
                            </div>
                            <div>
                                <label htmlFor="challanNoDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.challanNoLabel')}</label>
                                <input type="text" id="challanNoDc" value={challanNo} onChange={e => setChallanNo(e.target.value)} className="form-element bg-background/70" readOnly />
                            </div>
                            <div>
                                <label htmlFor="referenceNoDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.referenceNoLabel')}</label>
                                <input type="text" id="referenceNoDc" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} className="form-element" />
                            </div>
                            <div>
                                <label htmlFor="challanDateDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.challanDateLabel')}</label>
                                <input type="date" id="challanDateDc" value={challanDate} onChange={e => setChallanDate(e.target.value)} className="form-element" />
                            </div>
                            <div className="md:col-span-2"> {/* Made Challan Type wider */}
                                <label htmlFor="challanTypeDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.challanTypeLabel')}</label>
                                <select id="challanTypeDc" value={challanType} onChange={e => setChallanType(e.target.value)} className="form-element">
                                    <option value="" disabled>{t('deliveryChallans.challanTypePlaceholder')}</option>
                                    {challanTypes.map(type => (
                                        <option key={type.value} value={type.value}>{t(type.labelKey)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>


                        {/* Section 2: Item Table */}
                        <div className="form-section-divider">
                                              <h3 className="form-legend">{t('deliveryChallans.itemTable.title')}</h3>
                                              <div className="overflow-x-auto -mx-3">
                                                  <table className="w-full min-w-[600px] sm:min-w-[700px]">
                                                      <thead className="font-sans text-xs text-secondary uppercase bg-background/70">
                                                          <tr>
                                                              <th className="py-2 px-2 text-center w-10">{/* Drag */}</th>
                                                              <th className="py-2 px-2 text-left flex-1">{t('deliveryChallans.itemTable.itemDetails')}</th>
                                                              <th className="py-2 px-2 text-center w-24 sm:w-32">{t('deliveryChallans.itemTable.quantity')}</th>
                                                              <th className="py-2 px-2 text-left w-1/3">{t('deliveryChallans.itemTable.descriptionOptional')}</th>
                                                              <th className="py-2 px-2 text-center w-12">{/* Remove */}</th>
                                                          </tr>
                                                      </thead>
                                                      <tbody className="font-sans divide-y divide-borderLight">
                                                          {lineItems.map((item, index) => (
                                                              <tr key={item.id} className="item-row group hover:bg-primary/5">
                                                                  <td className="py-2.5 px-2 text-gray-400 cursor-grab text-center group-hover:text-primary">⠿</td>
                                                                  <td className="py-2.5 px-2">
                                                                      <input type="text" value={item.itemDetails} onChange={e => handleLineItemChange(index, 'itemDetails', e.target.value)} placeholder={t('common.searchOrType')} className="form-element-sm !p-2 w-full" />
                                                                  </td>
                                                                  <td className="py-2.5 px-1">
                                                                      <input type="number" value={item.quantity} onChange={e => handleLineItemChange(index, 'quantity', e.target.value)} min="1" className="form-element-sm !p-2 text-center" />
                                                                  </td>
                                                                  <td className="py-2.5 px-1">
                                                                      <input type="text" value={item.description} onChange={e => handleLineItemChange(index, 'description', e.target.value)} placeholder={t('common.optional')} className="form-element-sm !p-2 w-full" />
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
                                                  <PlusCircleIcon className="w-5 h-5" />
                                                  <span>{t('deliveryChallans.addItemBtn')}</span>
                                              </button>
                                          </div>

                        {/* Section 3: Notes, Summary, Attachments */}
                         <div className="form-section-divider">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <label htmlFor="customerNotesDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.customerNotesLabel')}</label>
                                    <textarea id="customerNotesDc" value={customerNotes} onChange={e => setCustomerNotes(e.target.value)} rows="3" placeholder={t('deliveryChallans.customerNotesPlaceholder')} className="form-element"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="termsConditionsDc" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.termsConditionsLabel')}</label>
                                    <textarea id="termsConditionsDc" value={termsConditions} onChange={e => setTermsConditions(e.target.value)} placeholder={t('deliveryChallans.termsConditionsPlaceholder')} rows="3" className="form-element"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="challan-files" className="block text-sm font-medium text-primary mb-1">{t('deliveryChallans.attachFilesLabel')}</label>
                                    <input type="file" id="challan-files" multiple onChange={handleFileChange} ref={fileInputRef} className="block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer form-element !p-0"/>
                                    <p className="text-xs text-secondary mt-1">{t('deliveryChallans.attachFilesHelp')}</p>
                                    {attachedFiles.length > 0 && (<div className="mt-2 text-xs text-secondary"><strong>{t('common.selectedFiles', 'Selected:')}</strong> {attachedFiles.map(f => f.name).join(', ')}</div>)}
                                </div>
                            </div>

                            <div className="lg:col-span-1 space-y-3 pt-1 font-sans text-sm bg-background/70 p-4 rounded-lg border border-borderLight">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-heading text-primary">{t('deliveryChallans.summary.totalQuantity')}:</span>
                                    <span className="font-heading text-primary font-bold">{totalQuantity}</span>
                                </div>
                                {/* Other summary details for challan can go here if any */}
                            </div>
                        </div>
                    </div>

                        {/* Form Actions */}
                         <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 mt-6 border-t border-borderLight">
                        <button type="button" onClick={() => console.log("Save as Draft clicked")} className="font-sans bg-cardBg hover:bg-borderLight text-secondary px-6 py-2.5 rounded-lg shadow-sm border border-borderDefault transition-colors">
                            {t('deliveryChallans.saveAsDraftBtn')}
                        </button>
                        <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-colors">
                            {t('deliveryChallans.saveAndSendBtn')}
                        </button>
                    </div>

                    </form>
                </section>
            </div>
        </main>
    );
};

export default DeliveryChallanCreatePage;