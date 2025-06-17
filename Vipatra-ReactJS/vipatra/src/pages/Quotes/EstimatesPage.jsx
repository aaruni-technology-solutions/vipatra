import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';

const EstimatesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Dummy data to ensure both vertical and horizontal scrolling can be tested
    const initialEstimates = [
        { id: 1, quoteNo: "QT-00001", customerName: "Sunshine Corp", quoteDate: "2023-10-25", status: "Sent", grandTotal: "15000.00" },
        { id: 2, quoteNo: "QT-00002", customerName: "BlueWave Technologies Inc.", quoteDate: "2023-10-22", status: "Draft", grandTotal: "8500.50" },
        { id: 3, quoteNo: "QT-00003", customerName: "GreenScape Gardens & Landscaping", quoteDate: "2023-10-21", status: "Approved", grandTotal: "22000.00" },
        { id: 4, quoteNo: "QT-00004", customerName: "Quantum Innovations Ltd.", quoteDate: "2023-10-20", status: "Sent", grandTotal: "45000.00" },
        { id: 5, quoteNo: "QT-00005", customerName: "City Bakers & Confectionery", quoteDate: "2023-10-18", status: "Rejected", grandTotal: "3200.00" },
        { id: 6, quoteNo: "QT-00006", customerName: "Modern Apparel & Fashion House", quoteDate: "2023-10-15", status: "Sent", grandTotal: "12500.00" },
        { id: 7, quoteNo: "QT-00007", customerName: "Coastal Exporters International", quoteDate: "2023-10-14", status: "Draft", grandTotal: "89000.00" },
        { id: 8, quoteNo: "QT-00008", customerName: "Phoenix Digital Solutions", quoteDate: "2023-10-11", status: "Approved", grandTotal: "5600.00" },
        { id: 9, quoteNo: "QT-00009", customerName: "Sunrise Hotels Group", quoteDate: "2023-10-10", status: "Sent", grandTotal: "31000.00" },
        { id: 10, quoteNo: "QT-00010", customerName: "DeepSea Logistics & Shipping", quoteDate: "2023-10-09", status: "Sent", grandTotal: "7500.75" },
        { id: 11, quoteNo: "QT-00011", customerName: "Apex Construction Materials", quoteDate: "2023-10-08", status: "Approved", grandTotal: "120500.00" },
        { id: 12, quoteNo: "QT-00012", customerName: "Starlight Diner & Cafe", quoteDate: "2023-10-07", status: "Draft", grandTotal: "4300.25" },
    ];
    
    const [estimates] = useState(initialEstimates);

    const handleNewEstimateClick = () => {
        navigate('/quotes/new'); 
    };

    return (
        // PAGE LAYOUT: The exact same flexbox structure as CustomersListPage
        <div className="flex flex-col h-full">
            <ActionHeader
                title={t('estimates.allEstimatesTitle', 'All Estimates')}
                onNewClick={handleNewEstimateClick}
                newButtonText={t('estimates.newEstimate', 'New Estimate')}
            />

            {/* MAIN CONTENT CONTAINER: Takes all available space, lays out children vertically, and prevents its own scrollbars */}
            <div className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                {estimates.length > 0 ? (
                    <>
                        {/* SCROLLABLE TABLE WRAPPER: This div expands and gets the scrollbars */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* STICKY HEADER CELLS: Stick to the top of the scrollable parent */}
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Date</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Estimate #</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Customer Name</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Status</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-right font-semibold text-primary border-b border-borderDefault">Amount</th>
                                        
                                        {/* STICKY CORNER CELL: Sticks to top-right corner with highest z-index */}
                                        <th className="sticky top-0 right-0 z-30 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estimates.map(est => (
                                        <tr key={est.id} className="hover:bg-background/50">
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{est.quoteDate}</td>
                                            <td className="p-3 border-b border-borderLight whitespace-nowrap"><Link to={`/estimates/${est.id}`} className="text-primary font-medium hover:text-accent hover:underline">{est.quoteNo}</Link></td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{est.customerName}</td>
                                            <td className="p-3 text-center border-b border-borderLight">
                                                <span className={`status-badge status-${est.status.toLowerCase()}`}>
                                                    {t(`status.${est.status.toLowerCase()}`, est.status)}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right text-primary font-semibold border-b border-borderLight whitespace-nowrap">₹{est.grandTotal}</td>
                                            
                                            {/* STICKY ACTION CELL: Sticks to the right edge and needs a background to hide content scrolling under it */}
                                            <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-white hover:bg-background/50">
                                                <div className="flex justify-center items-center space-x-1">
                                                    <button className="table-action-btn" title={t('actions.edit')}>
                                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* PAGINATION: Sits outside the scrollable area, so it's always visible */}
                        <div className="flex-shrink-0 mt-4 flex justify-end items-center font-sans text-sm text-secondary">
                            <span>Showing 1 to {estimates.length} of {estimates.length} estimates</span>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">{t('estimates.noEstimatesTitle', 'No Estimates Yet')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('estimates.noEstimatesSubtitle', 'Create your first estimate by clicking the "New Estimate" button.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EstimatesPage;