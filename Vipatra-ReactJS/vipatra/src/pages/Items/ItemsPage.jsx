// src/pages/Items/ItemsPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader'; // Adjust path if needed
import { PencilIcon } from '@heroicons/react/outline'; 

// --- DUMMY DATA MATCHING YOUR SQL SCHEMA ---
// This is the master list of items for this page to display.
const dummyItems = [
    { item_id: 1, item_name: 'Wireless Ergonomic Mouse', description: 'Advanced 2.4 GHz wireless mouse with 6 buttons.', unit: 'pcs', price: 2499.00, item_code: 'PROD-MS-001', item_type: 'product', quantity_in_stock: 150 },
    { item_id: 2, item_name: 'Mechanical Keyboard (RGB)', description: 'Full-size mechanical keyboard with customizable RGB backlighting.', unit: 'pcs', price: 5999.00, item_code: 'PROD-KB-002', item_type: 'product', quantity_in_stock: 85 },
    { item_id: 3, item_name: 'Website Design Consultation', description: '1-hour consultation session for UI/UX and web strategy.', unit: 'hrs', price: 4500.00, item_code: 'SERV-CONS-001', item_type: 'service', quantity_in_stock: null },
    { item_id: 4, item_name: 'Cloud Setup Service', description: 'Initial setup and configuration of cloud infrastructure.', unit: 'project', price: 25000.00, item_code: 'SERV-CLOUD-002', item_type: 'service', quantity_in_stock: null },
    { item_id: 5, item_name: '4K Monitor 27-inch', description: 'UHD 4K resolution monitor with HDR support.', unit: 'pcs', price: 28000.00, item_code: 'PROD-MON-004', item_type: 'product', quantity_in_stock: 45 },
    { item_id: 6, item_name: 'Annual Maintenance Contract', description: 'Yearly support and maintenance contract for enterprise systems.', unit: 'year', price: 150000.00, item_code: 'SERV-AMC-003', item_type: 'service', quantity_in_stock: null },
];

const ItemsPage = () => {
    // --- CORE HOOKS ---
    const { t } = useTranslation();
    const navigate = useNavigate(); // <-- Added useNavigate to handle navigation
    const { itemTypeUrlParam } = useParams();

    // --- STATE ---
    // This state holds the master list of items
    const [items, setItems] = useState(dummyItems);
    // This state holds the current filter type (e.g., 'product', 'service', or '')
    const [filterType, setFilterType] = useState('');

    // --- FILTERING LOGIC ---
    useEffect(() => {
        let currentFilter = '';
        if (itemTypeUrlParam) {
            const normalizedType = itemTypeUrlParam.toLowerCase();
            if (normalizedType.startsWith('product')) {
                currentFilter = 'product';
            } else if (normalizedType.startsWith('service')) {
                currentFilter = 'service';
            }
        }
        setFilterType(currentFilter);
    }, [itemTypeUrlParam]);

    // This efficiently filters the items whenever the master list or filter changes.
    const filteredItems = useMemo(() => {
        if (!filterType) {
            return items; // If no filter, show all items
        }
        return items.filter(item => item.item_type === filterType);
    }, [items, filterType]);

    // --- HELPER FUNCTIONS ---
    const getPageTitle = () => {
        switch (filterType) {
            case 'product': return t('items.allProductsTitle', 'All Products');
            case 'service': return t('items.allServicesTitle', 'All Services');
            default: return t('items.allItemsTitle', 'All Items');
        }
    };
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
    };

    // --- RENDER THE LIST VIEW ---
    return (
        <div className="flex flex-col h-full">
            <ActionHeader
                title={getPageTitle()}
                // THIS IS THE KEY CHANGE: onNewClick now navigates to the create page
                onNewClick={() => navigate('/items/new')}
                newButtonText={t('items.newItem', 'New Item')}
            />
            <div className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                {filteredItems.length > 0 ? (
                    <div className="flex-grow overflow-auto">
                        <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 z-20 bg-cardBg p-3 text-left font-semibold text-primary border-b border-borderLight">ITEM NAME</th>
                                    <th className="sticky top-0 z-20 bg-cardBg p-3 text-left font-semibold text-primary border-b border-borderLight">ITEM CODE</th>
                                    <th className="sticky top-0 z-20 bg-cardBg p-3 text-left font-semibold text-primary border-b border-borderLight">TYPE</th>
                                    <th className="sticky top-0 z-20 bg-cardBg p-3 text-right font-semibold text-primary border-b border-borderLight">STOCK</th>
                                    <th className="sticky top-0 z-20 bg-cardBg p-3 text-right font-semibold text-primary border-b border-borderLight">PRICE</th>
                                    <th className="sticky top-0 right-0 z-30 bg-cardBg p-3 text-center font-semibold text-primary border-b border-borderLight">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.item_id} className="hover:bg-background/50">
                                        <td className="p-3 border-b border-borderLight whitespace-nowrap">
                                            <Link to={`/items/${item.item_id}`} className="text-primary font-medium hover:text-accent hover:underline">{item.item_name}</Link>
                                        </td>
                                        <td className="p-3 text-secondary border-b border-borderLight font-mono text-xs">{item.item_code}</td>
                                        <td className="p-3 text-secondary border-b border-borderLight capitalize">{item.item_type}</td>
                                        <td className="p-3 text-right text-secondary border-b border-borderLight">
                                            {item.item_type === 'product' ? `${item.quantity_in_stock} ${item.unit}` : 'N/A'}
                                        </td>
                                        <td className="p-3 text-right text-primary font-semibold border-b border-borderLight whitespace-nowrap">{formatCurrency(item.price)}</td>
                                        <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-cardBg hover:bg-background/50">
                                            <button onClick={() => navigate(`/items/edit/${item.item_id}`)} className="text-primary p-1 rounded-full hover:bg-borderLight" title="Edit">
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">No Items Found For This Filter</h3>
                            <p className="text-secondary font-sans mb-6">Try changing the filter or create a new item by clicking the "New Item" button.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemsPage;