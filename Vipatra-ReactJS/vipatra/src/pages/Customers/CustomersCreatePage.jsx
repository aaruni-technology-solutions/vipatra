// src/pages/Customers/CustomersPage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CustomersPage = () => {
    const { t } = useTranslation();
    
    // --- All your state hooks remain the same ---
    const [customerType, setCustomerType] = useState('business');
    const [gstin, setGstin] = useState('');
    const [salutation, setSalutation] = useState('Mr.');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [workPhone, setWorkPhone] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [pan, setPan] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('Net 15');
    const [enablePortal, setEnablePortal] = useState(true);
    const [portalLanguage, setPortalLanguage] = useState('English');
    const [remarks, setRemarks] = useState('');
    const [customerOwner, setCustomerOwner] = useState('user1');
    const [address, setAddress] = useState({ street1: '', street2: '', city: '', state: '', zip: '', country: '' });

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSaveCustomer = (e) => {
        e.preventDefault();
        // ... your save logic
    };

    return (
        // THE WORKING PAGE LAYOUT - STICKY HEADER + SCROLLABLE CONTENT
        <main className="flex flex-col h-full bg-background">
            
            <div className="sticky top-0 z-10 bg-background px-6 sm:px-8 pt-4 pb-6">
                 <h2 className="text-3xl font-heading text-primary">
                    {t('customers.newCustomerTitle', 'New Customer')}
                </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8">
                <section className="dashboard-card">
                    <form onSubmit={handleSaveCustomer} className="space-y-8">

                        {/* GSTIN Prefill Section */}
                        <div>
                            <label htmlFor="gstin" className="form-label">{t('customers.prefillGstin', 'Prefill Customer details using GSTIN')}</label>
                            <div className="flex items-center space-x-3">
                                <input id="gstin" type="text" className="form-element flex-grow" placeholder={t('customers.gstinPlaceholder', 'Enter 15-digit GSTIN')} value={gstin} onChange={e => setGstin(e.target.value)} />
                                <button type="button" className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                                    {t('common.prefill', 'Prefill')}
                                </button>
                            </div>
                        </div>
                        
                        {/* Main Form Grid - Rebuilt with Tailwind CSS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            
                            {/* Customer Type - Spans 2 columns */}
                            <div className="md:col-span-2">
                                <label className="form-label">{t('customers.customerType', 'Customer Type')}</label>
                                <div className="flex space-x-6">
                                    <label className="flex items-center space-x-2"><input type="radio" name="customerType" value="business" className="form-radio" checked={customerType === 'business'} onChange={(e) => setCustomerType(e.target.value)} /> <span>{t('customers.business', 'Business')}</span></label>
                                    <label className="flex items-center space-x-2"><input type="radio" name="customerType" value="individual" className="form-radio" checked={customerType === 'individual'} onChange={(e) => setCustomerType(e.target.value)} /> <span>{t('customers.individual', 'Individual')}</span></label>
                                </div>
                            </div>
                            
                            {/* Primary Contact - Spans 2 columns, has a nested grid */}
                            <fieldset className="md:col-span-2">
                                <legend className="form-legend-sm">{t('customers.primaryContact', 'Primary Contact')}</legend>
                                <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr_1fr] gap-4">
                                    <div>
                                        <label htmlFor="salutation" className="form-label">{t('common.salutation', 'Salutation')}</label>
                                        <select id="salutation" className="form-element" value={salutation} onChange={e => setSalutation(e.target.value)}>
                                            <option>Mr.</option><option>Mrs.</option><option>Ms.</option><option>Miss.</option><option>Dr.</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="firstName" className="form-label">{t('common.firstName', 'First Name')}</label>
                                        <input id="firstName" type="text" className="form-element" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="form-label">{t('common.lastName', 'Last Name')}</label>
                                        <input id="lastName" type="text" className="form-element" value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>
                            </fieldset>

                            {/* Company Name */}
                            <div>
                                <label htmlFor="companyName" className="form-label">{t('customers.companyName', 'Company Name')}</label>
                                <input id="companyName" type="text" className="form-element" value={companyName} onChange={e => setCompanyName(e.target.value)} required/>
                            </div>

                            {/* Display Name */}
                            <div>
                                <label htmlFor="displayName" className="form-label">{t('customers.displayName', 'Display Name')}</label>
                                <input id="displayName" type="text" className="form-element" placeholder="Select or type to add" value={displayName} onChange={e => setDisplayName(e.target.value)} required/>
                            </div>

                            {/* Email Address */}
                            <div>
                                <label htmlFor="email" className="form-label">{t('common.emailAddress', 'Email Address')}</label>
                                <input id="email" type="email" className="form-element" value={email} onChange={e => setEmail(e.target.value)} required/>
                            </div>

                            {/* Currency (Read-only) */}
                            <div>
                                <label className="form-label">{t('common.currency', 'Currency')}</label>
                                <div className="form-element bg-background/70 cursor-not-allowed">
                                    USD - United States Dollar
                                </div>
                                 <p className="text-xs text-secondary mt-1">Currency cannot be edited.</p>
                            </div>

                            {/* Work Phone */}
                            <div>
                                <label htmlFor="workPhone" className="form-label">{t('common.workPhone', 'Work Phone')}</label>
                                <input id="workPhone" type="tel" className="form-element" value={workPhone} onChange={e => setWorkPhone(e.target.value)}/>
                            </div>

                            {/* Mobile Phone */}
                            <div>
                                <label htmlFor="mobilePhone" className="form-label">{t('common.mobile', 'Mobile')}</label>
                                <input id="mobilePhone" type="tel" className="form-element" value={mobilePhone} onChange={e => setMobilePhone(e.target.value)}/>
                            </div>

                            {/* Other Details Section Header */}
                            <div className="md:col-span-2 pt-4 mt-4 border-t border-borderLight">
                                <h3 className="form-legend">{t('common.otherDetails', 'Other Details')}</h3>
                            </div>
                            
                            {/* Address - Spans 2 columns, has a nested grid */}
                            <fieldset className="md:col-span-2">
                                <legend className="form-legend-sm">{t('common.address', 'Address')}</legend>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="md:col-span-2">
                                        <label htmlFor="street1" className="form-label">{t('common.street', 'Street')}</label>
                                        <input id="street1" name="street1" type="text" className="form-element mb-3" placeholder="Street 1" value={address.street1} onChange={handleAddressChange} />
                                        <input id="street2" name="street2" type="text" className="form-element" placeholder="Street 2" value={address.street2} onChange={handleAddressChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="form-label">{t('common.city', 'City')}</label>
                                        <input id="city" name="city" type="text" className="form-element" value={address.city} onChange={handleAddressChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="form-label">{t('common.state', 'State')}</label>
                                        <input id="state" name="state" type="text" className="form-element" value={address.state} onChange={handleAddressChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="zip" className="form-label">{t('common.zipCode', 'Zip Code')}</label>
                                        <input id="zip" name="zip" type="text" className="form-element" value={address.zip} onChange={handleAddressChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="form-label">{t('common.country', 'Country')}</label>
                                        <input id="country" name="country" type="text" className="form-element" value={address.country} onChange={handleAddressChange}/>
                                    </div>
                                </div>
                            </fieldset>

                            {/* PAN */}
                            <div>
                                <label htmlFor="pan" className="form-label">{t('common.pan', 'PAN')}</label>
                                <input id="pan" type="text" className="form-element" value={pan} onChange={e => setPan(e.target.value)} />
                            </div>

                            {/* Payment Terms */}
                            <div>
                                <label htmlFor="paymentTerms" className="form-label">{t('common.paymentTerms', 'Payment Terms')}</label>
                                <select id="paymentTerms" className="form-element" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)}>
                                    <option>Net 15</option><option>Net 30</option><option>Net 45</option><option>Net 60</option><option>Due on Receipt</option>
                                </select>
                            </div>
                            
                             {/* Portal Access */}
                            <div>
                                <label className="form-label">{t('customers.portalAccess', 'Portal Access')}</label>
                                <div className="flex items-center space-x-2 p-3 bg-background rounded-lg border border-borderLight">
                                    <input id="enablePortal" type="checkbox" className="form-checkbox" checked={enablePortal} onChange={e => setEnablePortal(e.target.checked)} />
                                    <label htmlFor="enablePortal" className="text-sm text-primary">{t('customers.allowPortalAccess', 'Allow portal access for this customer')}</label>
                                </div>
                            </div>
                            
                            {/* Portal Language */}
                            <div>
                                <label htmlFor="portalLanguage" className="form-label">{t('customers.portalLanguage', 'Portal Language')}</label>
                                <select id="portalLanguage" className="form-element" value={portalLanguage} onChange={e => setPortalLanguage(e.target.value)}>
                                    <option>English</option><option>Spanish</option><option>French</option><option>German</option>
                                </select>
                            </div>

                            {/* Remarks - Spans 2 columns */}
                            <div className="md:col-span-2">
                                <label htmlFor="remarks" className="form-label">{t('customers.remarks', 'Remarks')}</label>
                                <textarea id="remarks" className="form-element" rows="4" value={remarks} onChange={e => setRemarks(e.target.value)}></textarea>
                            </div>

                             {/* Documents - Spans 2 columns */}
                            <div className="md:col-span-2">
                                <label htmlFor="documents" className="form-label">{t('common.documents', 'Documents')}</label>
                                <input id="documents" type="file" multiple className="form-element" />
                                <p className="form-help-text">{t('customers.attachFilesHelp', 'You can upload a maximum of 3 files, 10MB each.')}</p>
                            </div>
                            
                            {/* Customer Owner - Spans 2 columns */}
                            <div className="md:col-span-2">
                                <label htmlFor="customerOwner" className="form-label">{t('customers.customerOwner', 'Customer Owner')}</label>
                                <select id="customerOwner" className="form-element" value={customerOwner} onChange={e => setCustomerOwner(e.target.value)}>
                                    <option value="user1">Alice (Me)</option><option value="user2">Bob Smith</option><option value="user3">Charlie Brown</option>
                                </select>
                                <p className="form-help-text">{t('customers.customerOwnerHelp', 'Assign a user as the customer owner.')}</p>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-borderLight">
                            <Link to="/customers" className="font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md border border-gray-300 transition-colors">
                                {t('common.cancel', 'Cancel')}
                            </Link>
                            <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-md shadow-sm transition-colors">
                                {t('common.save', 'Save')}
                            </button>
                        </div>

                    </form>
                </section>
            </div>
        </main>
    );
};

export default CustomersPage;