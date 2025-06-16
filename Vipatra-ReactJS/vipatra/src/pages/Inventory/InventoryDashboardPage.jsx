// src/pages/Inventory/InventoryDashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Dummy Data - Replace with API calls
const inventoryStatsData = {
    totalSKUs: "1,250",
    lowStockItemsCount: 15,
    fastMovingProductsCount: 28,
    batchesNearingExpiryCount: 8,
};

const criticalItemsData = [
    { id: 1, name: "Amoxicillin 250mg Tabs", sku: "AMX250-TAB", currentStock: 150, status: "ok", statusTextKey: "inventoryDashboard.criticalItems.inStock" },
    { id: 2, name: "Insulin Glargine Vials", sku: "INSGLR-VIAL", currentStock: 5, status: "low", statusTextKey: "inventoryDashboard.criticalItems.lowStockExclamation" },
    { id: 3, name: "Saline Solution 500ml", sku: "SAL500-ML", currentStock: 75, status: "ok", statusTextKey: "inventoryDashboard.criticalItems.inStock" },
];

const lowStockItemsTableData = [
    { id: 1, name: "Syringes (10ml)", sku: "SYR10ML", currentStock: 8, threshold: 10 },
    { id: 2, name: "Pain Relief Spray", sku: "PRSRAY01", currentStock: 3, threshold: 5 },
    { id: 3, name: "Vitamin C Tablets", sku: "VITC-TAB", currentStock: 12, threshold: 10 }, // Note: current stock is above threshold here for example
];

const batchTrackingData = [
    { id: 1, batchName: "Paracetamol Batch #P23001A", product: "Paracetamol 500mg", lotNo: "LOTX55789", expires: "July 15, 2024", expiresInDays: 20, quantity: 250, status: "nearing-expiry" },
    { id: 2, batchName: "Amoxicillin Batch #AMX005B", product: "Amoxicillin 250mg", lotNo: "LOTA01234", expires: "Dec 30, 2024", expiresInDays: 150, quantity: 500, status: "ok" },
];


const InventoryDashboardPage = () => {
    const { t } = useTranslation();
    // In a real app, fetch data here using useEffect and useState

    const getStatusClass = (status) => {
        switch (status) {
            case 'ok': return 'status-ok';
            case 'low': return 'status-low';
            case 'nearing-expiry': return 'status-nearing-expiry';
            default: return '';
        }
    };


    return (
        <main className="p-6 sm:p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-heading text-primary">{t('inventoryDashboard.title')}</h2>
                <p className="text-secondary font-sans mt-1">{t('inventoryDashboard.subtitle')}</p>
            </div>

            {/* 1. Inventory Dashboard: Quick Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="dashboard-card text-center">
                    <p className="text-sm text-secondary font-sans uppercase tracking-wider">{t('inventoryDashboard.stats.totalSKUs')}</p>
                    <p className="text-4xl font-bold font-sans text-primary mt-1">{inventoryStatsData.totalSKUs}</p>
                </div>
                <div className="dashboard-card text-center">
                    <p className="text-sm text-secondary font-sans uppercase tracking-wider">{t('inventoryDashboard.stats.lowStockItems')}</p>
                    <p className="text-4xl font-bold font-sans text-danger-DEFAULT mt-1">{inventoryStatsData.lowStockItemsCount}</p>
                    <a href="#lowStockItemsTable" className="text-xs text-secondary hover:text-accent mt-1 block">{t('inventoryDashboard.common.viewDetails')}</a>
                </div>
                <div className="dashboard-card text-center">
                    <p className="text-sm text-secondary font-sans uppercase tracking-wider">{t('inventoryDashboard.stats.fastMovingProducts')}</p>
                    <p className="text-4xl font-bold font-sans text-primary-dark mt-1">{inventoryStatsData.fastMovingProductsCount}</p>
                    <Link to="/reports/inventory/fast-moving" className="text-xs text-secondary hover:text-accent mt-1 block">{t('common.viewReport', 'View Report')}</Link>
                </div>
                <div className="dashboard-card text-center">
                    <p className="text-sm text-secondary font-sans uppercase tracking-wider">{t('inventoryDashboard.stats.batchesNearingExpiry')}</p>
                    <p className="text-4xl font-bold font-sans text-warning-dark mt-1">{inventoryStatsData.batchesNearingExpiryCount}</p>
                    <a href="#batchTrackingPanelContent" className="text-xs text-secondary hover:text-accent mt-1 block">{t('inventoryDashboard.batchTracking.viewAllBatches', 'View Batches')}</a>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Real-time stock levels for critical items & Low Stock Items */}
                <div className="lg:col-span-2 space-y-8">
                    <section id="criticalItemsStock" className="dashboard-card">
                        <h3 className="text-xl font-heading text-primary mb-4">{t('inventoryDashboard.criticalItems.title')}</h3>
                        <div className="space-y-3">
                            {criticalItemsData.map(item => (
                                <div key={item.id} className={`p-3 rounded-lg flex justify-between items-center ${item.status === 'low' ? 'bg-danger-light' : 'bg-background'}`}>
                                    <div>
                                        <p className={`font-semibold font-sans ${item.status === 'low' ? 'text-danger-dark' : 'text-primary'}`}>{item.name}</p>
                                        <p className="text-xs text-secondary font-sans">SKU: {item.sku}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-lg font-bold font-sans ${item.status === 'low' ? 'text-danger-dark' : 'text-primary'}`}>{item.currentStock} <span className="text-xs">{t('inventoryDashboard.criticalItems.units')}</span></p>
                                        <span className={`status-badge ${getStatusClass(item.status)}`}>{t(item.statusTextKey)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/inventory/critical-items" className="text-sm font-sans text-secondary hover:text-accent mt-4 block">{t('inventoryDashboard.criticalItems.viewAll')}</Link>
                    </section>

                    <section id="lowStockItemsTable" className="dashboard-card">
                        <h3 className="text-xl font-heading text-primary mb-4">{t('inventoryDashboard.detailedLowStock.title')}</h3>
                        <div className="overflow-x-auto bg-cardBg rounded-lg border border-borderDefault shadow-sm">
                            <table className="w-full min-w-[500px] text-sm font-sans">
                                <thead className="bg-background border-b border-borderDefault">
                                    <tr>
                                        <th className="p-3 text-left font-semibold text-primary">{t('inventoryDashboard.detailedLowStock.productName')}</th>
                                        <th className="p-3 text-center font-semibold text-primary">{t('inventoryDashboard.detailedLowStock.sku')}</th>
                                        <th className="p-3 text-center font-semibold text-primary">{t('inventoryDashboard.detailedLowStock.currentStock')}</th>
                                        <th className="p-3 text-center font-semibold text-primary">{t('inventoryDashboard.detailedLowStock.threshold')}</th>
                                        <th className="p-3 text-center font-semibold text-primary">{t('inventoryDashboard.detailedLowStock.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStockItemsTableData.map(item => (
                                        <tr key={item.id} className="border-b border-borderLight last:border-b-0">
                                            <td className="p-3 text-primary">{item.name}</td>
                                            <td className="p-3 text-center text-secondary">{item.sku}</td>
                                            <td className={`p-3 text-center font-semibold ${item.currentStock < item.threshold ? 'text-danger-DEFAULT' : 'text-primary'}`}>{item.currentStock}</td>
                                            <td className="p-3 text-center text-secondary">{item.threshold}</td>
                                            <td className="p-3 text-center">
                                                <button className="text-xs bg-primary hover:bg-primary-dark text-textOnPrimary px-3 py-1.5 rounded-md shadow-soft">{t('inventoryDashboard.detailedLowStock.restock')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {lowStockItemsTableData.length === 0 && <p className="p-4 text-center text-secondary">{t('common.noDataAvailable', 'No low stock items to display.')}</p>}
                        </div>
                    </section>
                </div>

                {/* Batch Tracking Panel */}
                <aside id="batchTrackingPanelContent" className="lg:col-span-1 dashboard-card">
                    <h3 className="text-xl font-heading text-primary mb-4">{t('inventoryDashboard.batchTracking.title')}</h3>
                    <div className="space-y-4 max-h-[400px] md:max-h-[calc(100vh-250px)] overflow-y-auto pr-2"> {/* Adjusted max-h */}
                        {batchTrackingData.map(batch => (
                            <div key={batch.id} className={`p-3 rounded-lg border ${batch.status === 'nearing-expiry' ? 'border-warning-dark bg-warning-light' : 'border-borderLight bg-background'}`}>
                                <p className={`font-semibold font-sans ${batch.status === 'nearing-expiry' ? 'text-warning-dark' : 'text-primary'}`}>{batch.batchName}</p>
                                <p className="text-xs text-secondary font-sans">{t('inventoryDashboard.batchTracking.productLabel')} {batch.product}</p>
                                <p className="text-xs text-secondary font-sans">{t('inventoryDashboard.batchTracking.lotNoLabel')} {batch.lotNo}</p>
                                <p className={`text-xs font-sans ${batch.status === 'nearing-expiry' ? 'text-warning-dark font-semibold' : 'text-primary'}`}>{t('inventoryDashboard.batchTracking.expiresLabel')} {batch.expires}
                                    {batch.status === 'nearing-expiry' && t('inventoryDashboard.batchTracking.expiresInDays', { count: batch.expiresInDays })}
                                </p>
                                <p className="text-xs text-secondary font-sans">{t('inventoryDashboard.batchTracking.quantityLabel')} {batch.quantity} {t('inventoryDashboard.criticalItems.units')}</p>
                                {batch.status === 'nearing-expiry' &&
                                    <button className="mt-2 text-xs bg-secondary hover:bg-secondary/80 text-textOnSecondary px-2 py-1 rounded-md shadow-soft">{t('inventoryDashboard.common.viewDetails')}</button>
                                }
                            </div>
                        ))}
                        {batchTrackingData.length === 0 && <p className="p-4 text-center text-secondary">{t('common.noDataAvailable', 'No batches to display.')}</p>}
                    </div>
                    <Link to="/inventory/batches" className="text-sm font-sans text-secondary hover:text-accent mt-4 block text-center">{t('inventoryDashboard.batchTracking.viewAllBatches')}</Link>
                </aside>
            </div>
        </main>
    );
};

export default InventoryDashboardPage;