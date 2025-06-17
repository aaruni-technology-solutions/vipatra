import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';
import { PencilIcon } from '@heroicons/react/outline';

const DeliveryChallansListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Added more dummy data to make vertical scrolling visible
    const initialChallans = [
        { id: 1, customerName: 'Wellness Clinic Pvt. Ltd.', invoiceNo: 'INV-2024-0078', challanNo: 'DC-0025', date: '2024-05-11', status: 'Delivered' },
        { id: 2, customerName: 'Tech Solutions Inc.', invoiceNo: 'INV-2024-0075', challanNo: 'DC-0024', date: '2024-05-02', status: 'In Transit' },
        { id: 3, customerName: 'BlueWave Technologies Inc.', invoiceNo: 'INV-2024-0077', challanNo: 'DC-0023', date: '2024-05-09', status: 'Returned' },
        { id: 4, customerName: 'GreenScape Gardens & Landscaping', invoiceNo: 'INV-2024-0074', challanNo: 'DC-0022', date: '2024-04-29', status: 'Delivered' },
        { id: 5, customerName: 'Modern Apparel & Fashion House', invoiceNo: 'INV-2024-0073', challanNo: 'DC-0021', date: '2024-04-26', status: 'Delivered' },
        { id: 6, customerName: 'Coastal Exporters International', invoiceNo: 'INV-2024-0072', challanNo: 'DC-0020', date: '2024-04-23', status: 'In Transit' },
        { id: 7, customerName: 'Phoenix Digital Solutions', invoiceNo: 'INV-2024-0071', challanNo: 'DC-0019', date: '2024-04-21', status: 'Delivered' },
        { id: 8, customerName: 'City Bakers & Confectionery', invoiceNo: 'INV-2024-0070', challanNo: 'DC-0018', date: '2024-04-19', status: 'Returned' },
        { id: 9, customerName: 'Sunrise Hotels Group', invoiceNo: 'INV-2024-0069', challanNo: 'DC-0017', date: '2024-04-16', status: 'Delivered' },
        { id: 10, customerName: 'Quantum Innovations Ltd.', invoiceNo: 'INV-2024-0068', challanNo: 'DC-0016', date: '2024-04-13', status: 'In Transit' },
    ];
    
    const [challans] = useState(initialChallans);

    const handleNewClick = () => {
        navigate('/delivery-challans/new'); 
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'status-paid'; // Green
            case 'in transit': return 'status-sent'; // Blue
            case 'returned': return 'status-overdue'; // Red/Orange
            default: return 'status-draft'; // Gray
        }
    };

    return (
        // PAGE LAYOUT: Applying the standard flexbox structure
        <div className="flex flex-col h-full">
            <ActionHeader
                title={t('deliveryChallans.allChallansTitle', 'All Delivery Challans')}
                onNewClick={handleNewClick}
                newButtonText={t('deliveryChallans.newChallan', 'New Challan')}
            />

            {/* MAIN CONTENT CONTAINER: Manages layout and overflow */}
            <div className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                {challans.length > 0 ? (
                    <>
                        {/* SCROLLABLE TABLE WRAPPER: This is the element that actually scrolls */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* STICKY HEADER CELLS */}
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Date</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Challan #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Invoice #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Customer Name</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Status</th>
                                        
                                        {/* STICKY CORNER CELL */}
                                        <th className="sticky top-0 right-0 z-30 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {challans.map(challan => (
                                        <tr key={challan.id} className="hover:bg-background/50">
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{challan.date}</td>
                                            <td className="p-3 border-b border-borderLight whitespace-nowrap">
                                                <Link to={`/delivery-challans/${challan.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                    {challan.challanNo}
                                                </Link>
                                            </td>
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{challan.invoiceNo}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{challan.customerName}</td>
                                            <td className="p-3 text-center border-b border-borderLight">
                                                <span className={`status-badge ${getStatusClass(challan.status)}`}>
                                                    {t(`status.${challan.status.toLowerCase().replace(' ', '_')}`, challan.status)}
                                                </span>
                                            </td>
                                            
                                            {/* STICKY ACTION CELL */}
                                            <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-white hover:bg-background/50">
                                                <div className="flex justify-center items-center">
                                                    <button onClick={() => navigate(`/delivery-challans/edit/${challan.id}`)} className="table-action-btn" title={t('actions.edit')}>
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* PAGINATION: Sits outside the scrollable area */}
                        <div className="flex-shrink-0 mt-4 flex justify-end items-center font-sans text-sm text-secondary">
                            <span>Showing 1 to {challans.length} of {challans.length} challans</span>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">{t('deliveryChallans.noChallansTitle', 'No Delivery Challans Found')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('deliveryChallans.noChallansSubtitle', 'Create your first challan by clicking the "New Challan" button.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveryChallansListPage;