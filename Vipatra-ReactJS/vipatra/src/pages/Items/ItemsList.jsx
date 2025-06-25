// src/pages/Items/ItemsListPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';
import { PencilIcon } from '@heroicons/react/outline';

// NEW DUMMY DATA MATCHING YOUR SQL SCHEMA
const dummyItems = [
    { item_id: 1, item_name: 'Wireless Ergonomic Mouse', description: 'Advanced 2.4 GHz wireless mouse with 6 buttons.', unit: 'pcs', price: 2499.00, tax_id: 1, item_code: 'PROD-MS-001', item_type: 'product', inventory_tracked: true, quantity_in_stock: 150 },
    { item_id: 2, item_name: 'Mechanical Keyboard (RGB)', description: 'Full-size mechanical keyboard with customizable RGB backlighting.', unit: 'pcs', price: 5999.00, tax_id: 1, item_code: 'PROD-KB-002', item_type: 'product', inventory_tracked: true, quantity_in_stock: 85 },
    { item_id: 3, item_name: 'Website Design Consultation', description: '1-hour consultation session for UI/UX and web strategy.', unit: 'hrs', price: 4500.00, tax_id: 2, item_code: 'SERV-CONS-001', item_type: 'service', inventory_tracked: false, quantity_in_stock: 0 },
    { item_id: 4, item_name: 'Cloud Setup Service', description: 'Initial setup and configuration of cloud infrastructure.', unit: 'project', price: 25000.00, tax_id: 2, item_code: 'SERV-CLOUD-002', item_type: 'service', inventory_tracked: false, quantity_in_stock: 0 },
    { item_id: 5, item_name: '4K Monitor 27-inch', description: 'UHD 4K resolution monitor with HDR support.', unit: 'pcs', price: 28000.00, tax_id: 1, item_code: 'PROD-MON-004', item_type: 'product', inventory_tracked: true, quantity_in_stock: 45 },
    { item_id: 6, item_name: 'Annual Maintenance Contract', description: 'Yearly support and maintenance contract.', unit: 'year', price: 150000.00, tax_id: 2, item_code: 'SERV-AMC-003', item_type: 'service', inventory_tracked: false, quantity_in_stock: 0 },
];

const ItemsListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { itemTypeUrlParam } = useParams();

    const [items, setItems] = useState(dummyItems);
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        let currentFilter = '';
        if (itemTypeUrlParam) {
            const normalizedType = itemTypeUrlParam.toLowerCase();
            if (normalizedType.startsWith('product')) currentFilter = 'product';
            else if (normalizedType.startsWith('service')) currentFilter = 'service';
        }
        setFilterType(currentFilter);
    }, [itemTypeUrlParam]);

    const filteredItems = useMemo(() => {
        if (!filterType) return items;
        return items.filter(item => item.item_type === filterType);
    }, [items, filterType]);

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

    return (
        <div className="flex flex-col h-full">
            <ActionHeader
                title={getPageTitle()}
                onNewClick={() => navigate('/items/new')} // NAVIGATES TO THE NEW FORM PAGE
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
                                        <td className="p-3 border-b border-borderLight"><Link to={`/items/${item.item_id}`} className="text-primary font-medium hover:text-accent hover:underline">{item.item_name}</Link></td>
                                        <td className="p-3 text-secondary border-b border-borderLight font-mono text-xs">{item.item_code}</td>
                                        <td className="p-3 text-secondary border-b border-borderLight capitalize">{item.item_type}</td>
                                        <td className="p-3 text-right text-secondary border-b border-borderLight">{item.inventory_tracked ? `${item.quantity_in_stock} ${item.unit}` : 'N/A'}</td>
                                        <td className="p-3 text-right text-primary font-semibold border-b border-borderLight">{formatCurrency(item.price)}</td>
                                        <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-cardBg hover:bg-background/50">
                                            <button onClick={() => navigate(`/items/edit/${item.item_id}`)} className="text-primary p-1 rounded-full hover:bg-borderLight" title="Edit"><PencilIcon className="w-5 h-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <h3 className="text-xl font-heading text-primary">No Items Found</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemsListPage;