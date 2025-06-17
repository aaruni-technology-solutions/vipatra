import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';
import { PencilIcon } from '@heroicons/react/outline';

const PackingSlipsListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Added more dummy data to ensure vertical scrolling is visible
    const initialPackingSlips = [
        { id: 1, customerName: 'Wellness Clinic Pvt. Ltd.', invoiceNo: 'INV-2024-0078', packingSlipNo: 'PS-0012', date: '2024-05-11' },
        { id: 2, customerName: 'Tech Solutions Inc.', invoiceNo: 'INV-2024-0075', packingSlipNo: 'PS-0011', date: '2024-05-02' },
        { id: 3, customerName: 'GreenScape Gardens & Landscaping', invoiceNo: 'INV-2024-0074', packingSlipNo: 'PS-0010', date: '2024-04-29' },
        { id: 4, customerName: 'Modern Apparel & Fashion House', invoiceNo: 'INV-2024-0073', packingSlipNo: 'PS-0009', date: '2024-04-26' },
        { id: 5, customerName: 'Coastal Exporters International', invoiceNo: 'INV-2024-0072', packingSlipNo: 'PS-0008', date: '2024-04-23' },
        { id: 6, customerName: 'Phoenix Digital Solutions', invoiceNo: 'INV-2024-0071', packingSlipNo: 'PS-0007', date: '2024-04-21' },
        { id: 7, customerName: 'City Bakers & Confectionery', invoiceNo: 'INV-2024-0070', packingSlipNo: 'PS-0006', date: '2024-04-19' },
        { id: 8, customerName: 'Sunrise Hotels Group', invoiceNo: 'INV-2024-0069', packingSlipNo: 'PS-0005', date: '2024-04-16' },
        { id: 9, customerName: 'Quantum Innovations Ltd.', invoiceNo: 'INV-2024-0068', packingSlipNo: 'PS-0004', date: '2024-04-13' },
        { id: 10, customerName: 'DeepSea Logistics & Shipping', invoiceNo: 'INV-2024-0067', packingSlipNo: 'PS-0003', date: '2024-04-11' },
    ];
    
    const [packingSlips] = useState(initialPackingSlips);

    const handleNewClick = () => {
        navigate('/packing-slips/new'); 
    };

    return (
        // PAGE LAYOUT: Applying the standard flexbox structure
        <div className="flex flex-col h-full">
            <ActionHeader
                title={t('packingSlip.allPackingSlipsTitle', 'All Packing Slips')}
                onNewClick={handleNewClick}
                newButtonText={t('packingSlip.newPackingSlip', 'New Packing Slip')}
            />

            {/* MAIN CONTENT CONTAINER: Takes all available space and manages child layout */}
            <div className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                {packingSlips.length > 0 ? (
                    <>
                        {/* SCROLLABLE TABLE WRAPPER: This is the element that scrolls */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* STICKY HEADER CELLS: Stick to the top */}
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Date</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Packing Slip #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Invoice #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Customer Name</th>
                                        
                                        {/* STICKY CORNER CELL: Sticks to the top-right */}
                                        <th className="sticky top-0 right-0 z-30 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {packingSlips.map(slip => (
                                        <tr key={slip.id} className="hover:bg-background/50">
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{slip.date}</td>
                                            <td className="p-3 border-b border-borderLight whitespace-nowrap">
                                                <Link to={`/packing-slips/${slip.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                    {slip.packingSlipNo}
                                                </Link>
                                            </td>
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{slip.invoiceNo}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{slip.customerName}</td>
                                            
                                            {/* STICKY ACTION CELL: Sticks to the right edge */}
                                            <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-white hover:bg-background/50">
                                                <div className="flex justify-center items-center">
                                                    <button onClick={() => navigate(`/packing-slips/edit/${slip.id}`)} className="table-action-btn" title={t('actions.edit')}>
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
                            <span>Showing 1 to {packingSlips.length} of {packingSlips.length} packing slips</span>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">{t('packingSlip.noSlipsTitle', 'No Packing Slips Found')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('packingSlip.noSlipsSubtitle', 'Create your first packing slip by clicking the "New Packing Slip" button.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackingSlipsListPage;