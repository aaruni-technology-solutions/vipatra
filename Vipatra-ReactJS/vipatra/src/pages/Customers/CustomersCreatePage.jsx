// src/pages/Customers/CustomersPage.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// --- Main Customers Page Component ---
// This component now directly renders the customer creation form.
const CustomersPage = () => {
    const { t } = useTranslation();
    
    // State for all form fields
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
    
    // Add state for address fields if needed
    // const [address, setAddress] = useState({ street1: '', city: '', ... });


    const handleSaveCustomer = (e) => {
        e.preventDefault();
        const newCustomerData = {
            customerType, gstin, salutation, firstName, lastName, companyName,
            displayName, email, workPhone, mobilePhone, pan, paymentTerms,
            enablePortal, portalLanguage, remarks, customerOwner
            // Collect other fields...
        };
        console.log("Saving New Customer:", newCustomerData);
        // Here you would typically call an API to save the data
        // and then redirect the user or show a success message.
    };
   
    const pageStyles = `
        /* ==== 1. FORM CONTAINER & GRID DEFINITION ==== */
        .customer-form-container {
            max-width: 1000px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            border: 1px solid #e5e7eb;
        }

        .customer-form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem 2rem; /* 24px row gap, 32px column gap */
            grid-template-areas:
                "header header"
                "gst-prefill gst-prefill"
                "customer-type customer-type"
                "primary-contact primary-contact"
                "company-name display-name"
                "email currency"
                "work-phone mobile-phone"
                "other-details-header other-details-header"
                "address address"
                "contact-persons-header contact-persons-header"
                "pan payment-terms"
                "portal-access portal-language"
                "remarks remarks"
                "documents documents"
                "customer-owner customer-owner"
                "form-actions form-actions";
        }

        /* Responsive layout for smaller screens */
        @media (max-width: 768px) {
            .customer-form-grid {
                grid-template-columns: 1fr;
                grid-template-areas:
                    "header"
                    "gst-prefill"
                    "customer-type"
                    "primary-contact"
                    "company-name"
                    "display-name"
                    "email"
                    "currency"
                    "work-phone"
                    "mobile-phone"
                    "other-details-header"
                    "address"
                    "contact-persons-header"
                    "pan"
                    "payment-terms"
                    "portal-access"
                    "portal-language"
                    "remarks"
                    "documents"
                    "customer-owner"
                    "form-actions";
            }
        }

        /* ==== 2. GRID AREA ASSIGNMENTS ==== */
        .form-header              { grid-area: header; }
        .form-group-gst           { grid-area: gst-prefill; }
        .form-group-type          { grid-area: customer-type; }
        .form-group-primary-contact { grid-area: primary-contact; }
        .form-group-company       { grid-area: company-name; }
        .form-group-display-name  { grid-area: display-name; }
        .form-group-email         { grid-area: email; }
        .form-group-currency      { grid-area: currency; }
        .form-group-work-phone    { grid-area: work-phone; }
        .form-group-mobile-phone  { grid-area: mobile-phone; }
        .form-section-header      { grid-area: other-details-header; }
        .form-group-address       { grid-area: address; }
        .form-group-pan           { grid-area: pan; }
        .form-group-payment-terms { grid-area: payment-terms; }
        .form-group-portal-enable { grid-area: portal-access; }
        .form-group-portal-lang   { grid-area: portal-language; }
        .form-group-remarks       { grid-area: remarks; }
        .form-group-documents     { grid-area: documents; }
        .form-group-owner         { grid-area: customer-owner; }
        .form-group-actions       { grid-area: form-actions; }

        /* ==== 3. GENERAL FORM STYLING ==== */
        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151; /* gray-700 */
        }
        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.625rem 0.75rem;
            border: 1px solid #d1d5db; /* gray-300 */
            border-radius: 0.375rem;
            box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.05);
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: #2563eb; /* blue-600 */
            box-shadow: 0 0 0 2px rgb(59 130 246 / 0.4);
        }
        .form-group-actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
            padding-top: 1.5rem;
            margin-top: 1rem;
            border-top: 1px solid #e5e7eb; /* gray-200 */
        }
        fieldset {
            border: none;
            padding: 0;
            margin: 0;
        }
        legend {
            font-size: 1.125rem;
            font-weight: 600;
            color: #111827; /* gray-900 */
            margin-bottom: 1rem;
        }

        /* Specific styles */
        .gst-prefill-wrapper { display: flex; gap: 0.75rem; }
        .gst-prefill-wrapper input { flex-grow: 1; }
        .primary-contact-wrapper { display: grid; grid-template-columns: 80px 1fr 1fr; gap: 1rem; }
        .address-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .address-street { grid-column: span 2; }
        .form-checkbox-wrapper { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; }
        .form-checkbox-wrapper input { width: auto; }
        .form-description { font-size: 0.875rem; color: #6b7280; }
    `;

    return (
        <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
            <style>{pageStyles}</style>
            
            <div className="customer-form-container">
                <form onSubmit={handleSaveCustomer} className="customer-form-grid">

                    {/* Form Header */}
                    <div className="form-header">
                        <h2 className="text-2xl font-bold text-gray-800">New Customer</h2>
                    </div>

                    {/* GSTIN Prefill */}
                    <div className="form-group-gst">
                        <label htmlFor="gstin" className="form-label">Prefill Customer details using GSTIN</label>
                        <div className="gst-prefill-wrapper">
                            <input id="gstin" type="text" className="form-input" placeholder="Enter 15-digit GSTIN" value={gstin} onChange={e => setGstin(e.target.value)} />
                            <button type="button" className="bg-primary text-white font-semibold px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">Prefill</button>
                        </div>
                    </div> 
                    
                    {/* Customer Type */}
                    <div className="form-group-type">
                        <label className="form-label">Customer Type</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center gap-2"><input type="radio" name="customerType" value="business" checked={customerType === 'business'} onChange={(e) => setCustomerType(e.target.value)} /> Business</label>
                            <label className="flex items-center gap-2"><input type="radio" name="customerType" value="individual" checked={customerType === 'individual'} onChange={(e) => setCustomerType(e.target.value)} /> Individual</label>
                        </div>
                    </div>
                    
                    {/* Primary Contact */}
                    <fieldset className="form-group-primary-contact">
                        <legend>Primary Contact</legend>
                        <div className="primary-contact-wrapper">
                            <div>
                                <label htmlFor="salutation" className="form-label">Salutation</label>
                                <select id="salutation" className="form-select" value={salutation} onChange={e => setSalutation(e.target.value)}>
                                    <option>Mr.</option>
                                    <option>Mrs.</option>
                                    <option>Ms.</option>
                                    <option>Miss.</option>
                                    <option>Dr.</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input id="firstName" type="text" className="form-input" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input id="lastName" type="text" className="form-input" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                        </div>
                    </fieldset>

                    {/* Company and Display Name */}
                    <div className="form-group-company">
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input id="companyName" type="text" className="form-input" value={companyName} onChange={e => setCompanyName(e.target.value)} required/>
                    </div>
                    <div className="form-group-display-name">
                        <label htmlFor="displayName" className="form-label">Display Name</label>
                        <input id="displayName" type="text" className="form-input" placeholder="Select or type to add" value={displayName} onChange={e => setDisplayName(e.target.value)} required/>
                    </div>

                    {/* Email and Currency */}
                    <div className="form-group-email">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input id="email" type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group-currency">
                        <label className="form-label">Currency</label>
                        <div className="form-input bg-gray-100 text-gray-500 cursor-not-allowed">
                            USD - United States Dollar
                        </div>
                         <p className="text-xs text-gray-500 mt-1">Currency cannot be edited.</p>
                    </div>

                    {/* Phone Numbers */}
                    <div className="form-group-work-phone">
                        <label htmlFor="workPhone" className="form-label">Work Phone</label>
                        <input id="workPhone" type="tel" className="form-input" value={workPhone} onChange={e => setWorkPhone(e.target.value)}/>
                    </div>
                    <div className="form-group-mobile-phone">
                        <label htmlFor="mobilePhone" className="form-label">Mobile</label>
                        <input id="mobilePhone" type="tel" className="form-input" value={mobilePhone} onChange={e => setMobilePhone(e.target.value)}/>
                    </div>

                    {/* Other Details Section Header */}
                    <div className="form-section-header col-span-full pt-4 mt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-700">Other Details</h3>
                    </div>

                    {/* Address Fieldset */}
                    <fieldset className="form-group-address">
                        <legend className="text-base font-medium">Address</legend>
                        <div className="address-wrapper">
                            <div className="address-street">
                                <label htmlFor="street1" className="form-label">Street</label>
                                <input id="street1" type="text" placeholder="Street 1" className="form-input" />
                            </div>
                             <div className="address-street">
                                <input id="street2" type="text" placeholder="Street 2" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="city" className="form-label">City</label>
                                <input id="city" type="text" className="form-input" />
                            </div>
                             <div>
                                <label htmlFor="state" className="form-label">State</label>
                                <input id="state" type="text" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="zip" className="form-label">Zip Code</label>
                                <input id="zip" type="text" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="country" className="form-label">Country</label>
                                <input id="country" type="text" className="form-input" />
                            </div>
                        </div>
                    </fieldset>

                    {/* PAN & Payment Terms */}
                    <div className="form-group-pan">
                        <label htmlFor="pan" className="form-label">PAN</label>
                        <input id="pan" type="text" className="form-input" value={pan} onChange={e => setPan(e.target.value)} />
                    </div>
                    <div className="form-group-payment-terms">
                        <label htmlFor="paymentTerms" className="form-label">Payment Terms</label>
                        <select id="paymentTerms" className="form-select" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)}>
                            <option>Net 15</option>
                            <option>Net 30</option>
                            <option>Net 45</option>
                            <option>Net 60</option>
                            <option>Due on Receipt</option>
                        </select>
                    </div>

                    {/* Portal Access */}
                    <div className="form-group-portal-enable">
                         <label className="form-label">Enable Portal?</label>
                         <div className="form-checkbox-wrapper">
                            <input id="enablePortal" type="checkbox" className="h-4 w-4 rounded" checked={enablePortal} onChange={e => setEnablePortal(e.target.checked)} />
                            <div>
                                <label htmlFor="enablePortal">Allow portal access for this customer</label>
                            </div>
                         </div>
                    </div>
                    <div className="form-group-portal-lang">
                        <label htmlFor="portalLanguage" className="form-label">Portal Language</label>
                        <select id="portalLanguage" className="form-select" value={portalLanguage} onChange={e => setPortalLanguage(e.target.value)}>
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                    </div>

                    {/* Remarks */}
                    <div className="form-group-remarks">
                        <label htmlFor="remarks" className="form-label">Remarks</label>
                        <textarea id="remarks" className="form-textarea" rows="4" value={remarks} onChange={e => setRemarks(e.target.value)}></textarea>
                    </div>

                    {/* Documents */}
                     <div className="form-group-documents">
                        <label htmlFor="documents" className="form-label">Documents</label>
                        <input id="documents" type="file" multiple className="form-input" />
                        <p className="form-description mt-1">You can upload a maximum of 3 files, 10MB each.</p>
                    </div>
                    
                    {/* Customer Owner */}
                    <div className="form-group-owner">
                        <label htmlFor="customerOwner" className="form-label">Customer Owner</label>
                        <select id="customerOwner" className="form-select" value={customerOwner} onChange={e => setCustomerOwner(e.target.value)}>
                            <option value="user1">Alice (Me)</option>
                            <option value="user2">Bob Smith</option>
                            <option value="user3">Charlie Brown</option>
                        </select>
                         <p className="form-description mt-1">Assign a user as the customer owner.</p>
                    </div>


                    {/* Action Buttons */}
                    <div className="form-group-actions">
                         <button type="button" onClick={() => { /* Handle Cancel Logic */ }} className="font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md border border-gray-300 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-md shadow-sm transition-colors">
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
};

export default CustomersPage;