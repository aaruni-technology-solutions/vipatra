// src/pages/Settings/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For handling hash navigation
import { useTranslation } from 'react-i18next';

// Define settings sections with icons
const settingsSectionsConfig = [
    { id: 'organizationProfile', labelKey: 'settings.nav.organizationProfile', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> },
    { id: 'userManagement', labelKey: 'settings.nav.userManagement', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M12 12a4 4 0 110-8 4 4 0 010 8z"></path></svg> },
    { id: 'invoiceCustomization', labelKey: 'settings.nav.invoiceCustomization', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> },
    { id: 'eInvoicingSettings', labelKey: 'settings.nav.eInvoicing', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2zm0-14v3m0 0v3m0-3h3m-3 0H9"></path></svg> },
    { id: 'taxSettings', labelKey: 'settings.nav.taxSettings', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 0v6m0-6L9 13m6-6l-6 6m6-6v6m0-6H9m3 6h.01M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> },
    { id: 'paymentGateways', labelKey: 'settings.nav.paymentGateways', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> },
    { id: 'emailSettings', labelKey: 'settings.nav.emailSettings', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> },
    { id: 'dataManagement', labelKey: 'settings.nav.dataManagement', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10m16-5H4m16 0a2 2 0 100-4h-3l-4-4-4 4H4a2 2 0 100 4h16z"></path></svg> },
    { id: 'integrations', labelKey: 'settings.nav.integrations', icon: <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> },
];

const SettingsPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const getActiveSectionFromHash = () => {
        const hash = location.hash.substring(1);
        return settingsSectionsConfig.find(s => s.id === hash) ? hash : settingsSectionsConfig[0].id;
    };

    const [activeSection, setActiveSection] = useState(getActiveSectionFromHash());

    useEffect(() => {
        setActiveSection(getActiveSectionFromHash());
    }, [location.hash]);

    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
        navigate(`#${sectionId}`);
    };

    // --- Dummy state for Organization Profile ---
    const [orgName, setOrgName] = useState("Vipatra Billing Pro Inc.");
    const [orgIndustry, setOrgIndustry] = useState("Software");
    const [orgAddress, setOrgAddress] = useState("123 App Street, Tech City, TC 54321");
    const [orgEmail, setOrgEmail] = useState("admin@vipatra.pro");
    const [orgPhone, setOrgPhone] = useState("+1-234-567-8900");
    const [orgTaxId, setOrgTaxId] = useState("22AAAAA0000A1Z5");
    const [orgLogoName, setOrgLogoName] = useState("logo.png");
    const [defaultCurrency, setDefaultCurrency] = useState("INR");

    // --- Dummy state for User Management ---
    const dummyUsers = [
        { id: 1, name: "Administrator", email: "admin@vipatra.pro", roleKey: "settings.userManagement.roles.admin", statusKey: "settings.userManagement.userStatus.active" },
        { id: 2, name: "Billing Clerk", email: "billing@vipatra.pro", roleKey: "settings.userManagement.roles.billing", statusKey: "settings.userManagement.userStatus.active" },
    ];

    // --- Dummy state for e-Invoicing ---
    const [enableEInvoicing, setEnableEInvoicing] = useState(false);
    const [eInvoiceProvider, setEInvoiceProvider] = useState('');
    const [gspUsername, setGspUsername] = useState('');
    const [gspPassword, setGspPassword] = useState('');
    const [gspApiEndpoint, setGspApiEndpoint] = useState('');
    const [testConnectionStatus, setTestConnectionStatus] = useState('');


    const handleOrgProfileSubmit = (e) => {
        e.preventDefault();
        alert("Organization Profile Saved!");
    };
    
    const handleEInvoiceSettingsSubmit = (e) => {
        e.preventDefault();
        alert("e-Invoicing Settings Saved!");
        setTestConnectionStatus('');
    };

    const handleTestConnection = () => {
        setTestConnectionStatus(t('common.testing', 'Testing...'));
        setTimeout(() => {
            setTestConnectionStatus(Math.random() > 0.5 ? t('common.connectionSuccessful', 'Connection Successful!') : t('common.connectionFailed', 'Connection Failed. Check details.'));
        }, 2000);
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'organizationProfile':
                return (
                    <section id="organizationProfileSection" className="settings-section">
                        <div className="dashboard-card">
                            <h3 className="text-2xl font-heading text-primary mb-6 border-b border-borderLight pb-3">{t('settings.organizationProfile.title')}</h3>
                            <form onSubmit={handleOrgProfileSubmit} className="space-y-6 font-sans">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label htmlFor="orgName" className="block text-sm font-medium text-primary mb-1">{t('settings.organizationProfile.orgNameLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label><input type="text" id="orgName" value={orgName} onChange={e => setOrgName(e.target.value)} className="form-element" /></div>
                                    <div><label htmlFor="orgIndustry" className="block text-sm font-medium text-primary mb-1">{t('settings.organizationProfile.industryLabel')}</label><select id="orgIndustry" value={orgIndustry} onChange={e => setOrgIndustry(e.target.value)} className="form-element"><option>Software</option><option>Healthcare</option><option>Retail</option><option>Services</option><option>Other</option></select></div>
                                </div>
                                <div><label htmlFor="orgAddress" className="block text-sm font-medium text-primary mb-1">{t('settings.organizationProfile.addressLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label><textarea id="orgAddress" value={orgAddress} onChange={e => setOrgAddress(e.target.value)} rows="3" className="form-element" placeholder={t('settings.organizationProfile.addressPlaceholder')}></textarea></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label htmlFor="orgEmail" className="block text-sm font-medium text-primary mb-1">{t('settings.organizationProfile.emailLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label><input type="email" id="orgEmail" value={orgEmail} onChange={e => setOrgEmail(e.target.value)} className="form-element" /></div>
                                    <div><label htmlFor="orgPhone" className="block text-sm font-medium text-primary mb-1">{t('settings.organizationProfile.phoneLabel')} <span className="text-danger-DEFAULT">{t('common.required')}</span></label><input type="tel" id="orgPhone" value={orgPhone} onChange={e => setOrgPhone(e.target.value)} className="form-element" /></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label htmlFor="orgTaxId" className="block text-sm font-medium text-primary mb-1">{t('settings.organizationProfile.taxIdLabel')}</label><input type="text" id="orgTaxId" value={orgTaxId} onChange={e => setOrgTaxId(e.target.value)} className="form-element" /></div>
                                    <div><label htmlFor="orgLogo" className="block text-sm font-medium text-primary mb-1">{t('settings.organizationProfile.logoLabel')}</label><input type="file" id="orgLogo" className="form-element file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" /><p className="text-xs text-secondary mt-1">{t('settings.organizationProfile.logoHelpText', { fileName: orgLogoName })}</p></div>
                                </div>
                                <div><label htmlFor="defaultCurrency" className="block text-sm font-medium text-primary mb-1">{t('settings.organizationProfile.defaultCurrencyLabel')}</label><select id="defaultCurrency" value={defaultCurrency} onChange={e => setDefaultCurrency(e.target.value)} className="form-element"><option value="INR">{t('settings.organizationProfile.currencies.inr')}</option><option value="USD">{t('settings.organizationProfile.currencies.usd')}</option></select></div>
                                <div className="pt-4 text-right"><button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">{t('settings.organizationProfile.saveChangesBtn')}</button></div>
                            </form>
                        </div>
                    </section>
                );
            case 'userManagement':
                return (
                    <section id="userManagementSection" className="settings-section">
                        <div className="dashboard-card">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-borderLight pb-3">
                                <h3 className="text-2xl font-heading text-primary">{t('settings.userManagement.title')}</h3>
                                <button className="mt-3 sm:mt-0 font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2 rounded-lg shadow-soft text-sm flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    <span>{t('settings.userManagement.addNewUserBtn')}</span>
                                </button>
                            </div>
                            <p className="font-sans text-secondary mb-6">{t('settings.userManagement.description')}</p>
                            <div className="overflow-x-auto bg-cardBg rounded-lg border border-borderDefault shadow-sm">
                                <table className="w-full min-w-[600px] text-sm font-sans">
                                    <thead className="bg-background border-b border-borderDefault">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-primary">{t('settings.userManagement.table.name')}</th><th className="p-3 text-left font-semibold text-primary">{t('settings.userManagement.table.email')}</th><th className="p-3 text-left font-semibold text-primary">{t('settings.userManagement.table.role')}</th><th className="p-3 text-center font-semibold text-primary">{t('settings.userManagement.table.status')}</th><th className="p-3 text-center font-semibold text-primary">{t('settings.userManagement.table.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dummyUsers.map(user => (
                                            <tr key={user.id} className="border-b border-borderLight last:border-b-0">
                                                <td className="p-3 text-primary">{user.name}</td><td className="p-3 text-secondary">{user.email}</td><td className="p-3 text-secondary">{t(user.roleKey)}</td>
                                                <td className="p-3 text-center"><span className={`px-2 py-0.5 text-xs rounded-full font-medium ${user.statusKey.includes('active') ? 'bg-success-light text-success-dark' : 'bg-gray-200 text-gray-700'}`}>{t(user.statusKey)}</span></td>
                                                <td className="p-3 text-center space-x-2"><button className="text-primary hover:text-accent" title={t('actions.edit','Edit')}><svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button><button className="text-danger-DEFAULT hover:text-danger-dark" title={t('actions.disable','Disable')}><svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                );
            case 'eInvoicingSettings':
                 return (
                    <section id="eInvoicingSettingsSection" className="settings-section">
                        <div className="dashboard-card">
                            <h3 className="text-2xl font-heading text-primary mb-6 border-b border-borderLight pb-3">{t('settings.eInvoicing.title')}</h3>
                            <form onSubmit={handleEInvoiceSettingsSubmit} className="space-y-6 font-sans">
                                <div>
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <input type="checkbox" id="enableEInvoicing" name="enableEInvoicing" checked={enableEInvoicing} onChange={e => setEnableEInvoicing(e.target.checked)} className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary" />
                                        <span className="text-md font-medium text-primary">{t('settings.eInvoicing.enableLabel')}</span>
                                    </label>
                                    <p className="text-xs text-secondary mt-1 pl-8">{t('settings.eInvoicing.enableHelp')}</p>
                                </div>
                                {enableEInvoicing && (
                                    <div id="eInvoiceProviderDetails" className="space-y-6 border-t border-borderLight pt-6 mt-6">
                                        <p className="text-sm text-secondary">{t('settings.eInvoicing.providerDetailsIntro')}</p>
                                        <div><label htmlFor="eInvoiceProvider" className="block text-sm font-medium text-primary mb-1">{t('settings.eInvoicing.providerLabel')}</label><select id="eInvoiceProvider" name="eInvoiceProvider" value={eInvoiceProvider} onChange={e => setEInvoiceProvider(e.target.value)} className="form-element"><option value="">{t('settings.eInvoicing.selectProviderOption')}</option><option value="gsp_a">{t('settings.eInvoicing.providers.gsp_a')}</option><option value="gsp_b">{t('settings.eInvoicing.providers.gsp_b')}</option><option value="nic_einv">{t('settings.eInvoicing.providers.nic_einv')}</option><option value="other">{t('settings.eInvoicing.providers.other')}</option></select></div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div><label htmlFor="gspUsername" className="block text-sm font-medium text-primary mb-1">{t('settings.eInvoicing.usernameLabel')}</label><input type="text" id="gspUsername" value={gspUsername} onChange={e => setGspUsername(e.target.value)} className="form-element" /></div>
                                            <div><label htmlFor="gspPassword" className="block text-sm font-medium text-primary mb-1">{t('settings.eInvoicing.passwordLabel')}</label><input type="password" id="gspPassword" value={gspPassword} onChange={e => setGspPassword(e.target.value)} className="form-element" /></div>
                                        </div>
                                        <div><label htmlFor="gspApiEndpoint" className="block text-sm font-medium text-primary mb-1">{t('settings.eInvoicing.apiEndpointLabel')}</label><input type="url" id="gspApiEndpoint" value={gspApiEndpoint} onChange={e => setGspApiEndpoint(e.target.value)} placeholder={t('settings.eInvoicing.apiEndpointPlaceholder')} className="form-element" /></div>
                                        <div className="flex items-center space-x-3"><button type="button" onClick={handleTestConnection} className="font-sans bg-accent hover:bg-accent-dark text-textDark px-4 py-2 rounded-lg shadow-sm text-sm">{t('settings.eInvoicing.testConnectionBtn')}</button><span className="text-xs text-secondary">{testConnectionStatus}</span></div>
                                    </div>
                                )}
                                <div className="pt-6 text-right border-t border-borderLight mt-8"><button type="submit" className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors">{t('settings.eInvoicing.saveSettingsBtn')}</button></div>
                            </form>
                        </div>
                    </section>
                );
            case 'invoiceCustomization': return <section id="invoiceCustomizationSection" className="settings-section"><div className="dashboard-card"><h3 className="text-2xl font-heading text-primary mb-6 border-b border-borderLight pb-3">{t('settings.invoiceCustomization.title')}</h3><p className="font-sans text-secondary mb-4">{t('settings.invoiceCustomization.description')}</p><div className="mt-6 bg-background p-6 rounded-lg text-center">{t('settings.invoiceCustomization.placeholder')}</div></div></section>;
            case 'taxSettings': return <section id="taxSettingsSection" className="settings-section"><div className="dashboard-card"><h3 className="text-2xl font-heading text-primary mb-6 border-b border-borderLight pb-3">{t('settings.taxSettingsContent.title')}</h3><div className="mt-6 bg-background p-6 rounded-lg text-center">{t('settings.taxSettingsContent.placeholder')}</div></div></section>;
            case 'paymentGateways': return <section id="paymentGatewaysSection" className="settings-section"><div className="dashboard-card"><h3 className="text-2xl font-heading text-primary mb-6 border-b border-borderLight pb-3">{t('settings.paymentGatewaysContent.title')}</h3><div className="mt-6 bg-background p-6 rounded-lg text-center">{t('settings.paymentGatewaysContent.placeholder')}</div></div></section>;
            case 'emailSettings': return <section id="emailSettingsSection" className="settings-section"><div className="dashboard-card"><h3 className="text-2xl font-heading text-primary mb-6 border-b border-borderLight pb-3">{t('settings.emailSettingsContent.title')}</h3><div className="mt-6 bg-background p-6 rounded-lg text-center">{t('settings.emailSettingsContent.placeholder')}</div></div></section>;
            case 'dataManagement': return <section id="dataManagementSection" className="settings-section"><div className="dashboard-card"><h3 className="text-2xl font-heading text-primary mb-6 border-b border-borderLight pb-3">{t('settings.dataManagementContent.title')}</h3><div className="mt-6 bg-background p-6 rounded-lg text-center">{t('settings.dataManagementContent.placeholder')}</div></div></section>;
            case 'integrations': return <section id="integrationsSection" className="settings-section"><div className="dashboard-card"><h3 className="text-2xl font-heading text-primary mb-6 border-b border-borderLight pb-3">{t('settings.integrationsContent.title')}</h3><div className="mt-6 bg-background p-6 rounded-lg text-center">{t('settings.integrationsContent.placeholder')}</div></div></section>;
            default: return <section><div className="dashboard-card"><p>{t('settings.nav.organizationProfile')}</p></div></section>;
        }
    };


    return (
        <div className="p-6 sm:p-10">
            {/* Page Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-heading text-primary font-semibold">{t('settings.sidebarTitle', 'Settings')}</h2>
                <p className="text-secondary font-sans mt-1">{t('settings.pageSubtitle', 'Manage your organization, users, and system preferences.')}</p>
            </div>

            {/* Horizontal Navigation Tabs */}
            <div className="border-b border-borderLight mb-8">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {settingsSectionsConfig.map(section => (
                        <button
                            key={section.id}
                            onClick={() => handleSectionChange(section.id)}
                            className={`whitespace-nowrap flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out focus:outline-none ${
                                activeSection === section.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-secondary hover:text-primary hover:border-gray-300'
                            }`}
                        >
                            {section.icon}
                            <span>{t(section.labelKey)}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Settings Content Area */}
            <div id="settingsContent">
                {renderSectionContent()}
            </div>
        </div>
    );
};

export default SettingsPage;