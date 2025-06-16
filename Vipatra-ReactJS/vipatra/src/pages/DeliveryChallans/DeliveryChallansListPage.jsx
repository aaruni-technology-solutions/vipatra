// src/pages/DeliveryChallans/DeliveryChallansListPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import ActionHeader from '../../components/layout/ActionHeader';

// Dummy data for the list view
const initialChallans = [
    { id: 1, customerName: 'Wellness Clinic Pvt. Ltd.', invoiceNo: 'INV-2024-0078', challanNo: 'DC-0025', date: '2024-05-11', status: 'Delivered' },
    { id: 2, customerName: 'Tech Solutions Inc.', invoiceNo: 'INV-2024-0075', challanNo: 'DC-0024', date: '2024-05-02', status: 'In Transit' },
    { id: 3, customerName: 'BlueWave Tech', invoiceNo: 'INV-2024-0077', challanNo: 'DC-0023', date: '2024-05-09', status: 'Returned' },
];

const DeliveryChallansListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [challans, setChallans] = useState(initialChallans);

    // Navigation handler for the "New" button
    const handleNewClick = () => {
        // Navigate to your existing create page
        navigate('/delivery-challans/new'); 
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    {/* Add the ActionHeader */}
                    <ActionHeader
                        title={t('deliveryChallans.allChallansTitle', 'All Delivery Challans')}
                        onNewClick={handleNewClick}
                    />
                    
                    {/* The table view for Delivery Challans */}
                    <div className="dashboard-card">
                        {challans.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm font-sans">
                                    <thead className="bg-background border-b border-borderDefault">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-primary">{t('deliveryChallans.table.date', 'Date')}</th>
                                            <th className="p-3 text-left font-semibold text-primary">{t('deliveryChallans.table.challanNo', 'Challan #')}</th>
                                            <th className="p-3 text-left font-semibold text-primary">{t('deliveryChallans.table.invoiceNo', 'Invoice #')}</th>
                                            <th className="p-3 text-left font-semibold text-primary">{t('deliveryChallans.table.customerName', 'Customer Name')}</th>
                                            <th className="p-3 text-center font-semibold text-primary">{t('common.status', 'Status')}</th>
                                            <th className="p-3 text-center font-semibold text-primary">{t('common.actions', 'Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {challans.map(challan => (
                                            <tr key={challan.id} className="border-b border-borderLight hover:bg-background/50">
                                                <td className="p-3 text-secondary">{challan.date}</td>
                                                <td className="p-3">
                                                    <Link to={`/delivery-challans/${challan.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                        {challan.challanNo}
                                                    </Link>
                                                </td>
                                                <td className="p-3 text-secondary">{challan.invoiceNo}</td>
                                                <td className="p-3 text-secondary">{challan.customerName}</td>
                                                <td className="p-3 text-center">
                                                    <span className={`status-badge ${challan.status === 'Delivered' ? 'status-paid' : 'status-sent'}`}>
                                                        {challan.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <button className="table-action-btn" title={t('actions.view', 'View')}>
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-heading text-primary mb-2">{t('deliveryChallans.noChallansTitle', 'No Delivery Challans Found')}</h3>
                                <p className="text-secondary font-sans mb-6">{t('deliveryChallans.noChallansSubtitle', 'Create your first challan by clicking the "New" button.')}</p>
                                <button onClick={handleNewClick} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-5 py-2.5 rounded-lg shadow-md">
                                    {t('deliveryChallans.createFirstChallanBtn', 'Create Delivery Challan')}
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default DeliveryChallansListPage;