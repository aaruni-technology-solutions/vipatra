import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ActionHeader from '../../components/layout/ActionHeader';
import { PencilIcon } from '@heroicons/react/outline';

const ExpensesListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Expanded dummy data to make vertical scrolling visible
    const initialExpenses = [
        { id: 1, date: '2024-05-20', category: 'Meals and Entertainment', vendor: 'The Grand Cafe', amount: '1250.00', status: 'Reimbursable' },
        { id: 2, date: '2024-05-18', category: 'Mileage', vendor: 'Self (120 km)', amount: '600.00', status: 'Reimbursed' },
        { id: 3, date: '2024-05-15', category: 'Office Supplies', vendor: 'Stationery World', amount: '2100.00', status: 'Non-reimbursable' },
        { id: 4, date: '2024-05-12', category: 'Travel', vendor: 'Indigo Airlines', amount: '8500.00', status: 'Reimbursable' },
        { id: 5, date: '2024-05-10', category: 'Software', vendor: 'Adobe Inc.', amount: '4500.00', status: 'Non-reimbursable' },
        { id: 6, date: '2024-05-08', category: 'Lodging', vendor: 'Sunrise Hotels', amount: '6200.00', status: 'Reimbursed' },
        { id: 7, date: '2024-05-05', category: 'Meals and Entertainment', vendor: 'City Bakers', amount: '850.00', status: 'Reimbursable' },
        { id: 8, date: '2024-05-02', category: 'Utilities', vendor: 'State Electricity Board', amount: '3200.00', status: 'Non-reimbursable' },
        { id: 9, date: '2024-04-28', category: 'Mileage', vendor: 'Self (250 km)', amount: '1250.00', status: 'Reimbursable' },
    ];
    
    const [expenses] = useState(initialExpenses);

    const handleNewClick = () => {
        navigate('/expenses/new'); 
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'reimbursed': return 'status-paid'; // Green
            case 'reimbursable': return 'status-sent'; // Blue
            case 'non-reimbursable': return 'status-draft'; // Gray
            default: return 'status-draft';
        }
    };

    return (
        // PAGE LAYOUT: Applying the standard flexbox structure
        <div className="flex flex-col h-full">
            <ActionHeader
                title={t('expenses.allExpensesTitle', 'All Expenses')}
                onNewClick={handleNewClick}
                newButtonText={t('expenses.newExpense', 'New Expense')}
            />

            {/* MAIN CONTENT CONTAINER: Manages layout and overflow */}
            <div className="dashboard-card flex flex-col flex-grow mt-4 overflow-hidden">
                {expenses.length > 0 ? (
                    <>
                        {/* SCROLLABLE TABLE WRAPPER: This is the element that scrolls */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* STICKY HEADER CELLS */}
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Date</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Category</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Vendor/Employee</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Status</th>
                                        <th className="sticky top-0 z-20 bg-background p-3 text-right font-semibold text-primary border-b border-borderDefault">Amount</th>
                                        
                                        {/* STICKY CORNER CELL */}
                                        <th className="sticky top-0 right-0 z-30 bg-background p-3 text-center font-semibold text-primary border-b border-borderDefault">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map(exp => (
                                        <tr key={exp.id} className="hover:bg-background/50">
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{exp.date}</td>
                                            <td className="p-3 border-b border-borderLight">
                                                <Link to={`/expenses/${exp.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                    {exp.category}
                                                </Link>
                                            </td>
                                            <td className="p-3 text-secondary border-b border-borderLight">{exp.vendor}</td>
                                            <td className="p-3 text-center border-b border-borderLight">
                                                <span className={`status-badge ${getStatusClass(exp.status)}`}>
                                                    {t(`status.${exp.status.toLowerCase().replace('-', '_')}`, exp.status)}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right text-primary font-semibold border-b border-borderLight whitespace-nowrap">₹{exp.amount}</td>

                                            {/* STICKY ACTION CELL */}
                                            <td className="sticky right-0 z-10 p-3 text-center border-b border-borderLight bg-white hover:bg-background/50">
                                                <div className="flex justify-center items-center">
                                                    <button onClick={() => navigate(`/expenses/edit/${exp.id}`)} className="table-action-btn" title={t('actions.edit')}>
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
                            <span>Showing 1 to {expenses.length} of {expenses.length} expenses</span>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">{t('expenses.noExpensesTitle', 'No Expenses Recorded')}</h3>
                            <p className="text-secondary font-sans mb-6">{t('expenses.noExpensesSubtitle', 'Record your first expense by clicking the "New Expense" button.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpensesListPage;