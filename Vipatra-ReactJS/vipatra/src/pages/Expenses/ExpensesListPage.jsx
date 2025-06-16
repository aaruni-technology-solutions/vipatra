// src/pages/Expenses/ExpensesListPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import ActionHeader from '../../components/layout/ActionHeader';

// Dummy data for the list view
const initialExpenses = [
    { id: 1, date: '2024-05-20', category: 'Meals and Entertainment', vendor: 'The Grand Cafe', amount: '1,250.00', status: 'Reimbursable' },
    { id: 2, date: '2024-05-18', category: 'Mileage', vendor: 'Self (120 km)', amount: '600.00', status: 'Reimbursed' },
    { id: 3, date: '2024-05-15', category: 'Office Supplies', vendor: 'Stationery World', amount: '2,100.00', status: 'Non-reimbursable' },
    { id: 4, date: '2024-05-12', category: 'Travel', vendor: 'Indigo Airlines', amount: '8,500.00', status: 'Reimbursable' },
];

const ExpensesListPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState(initialExpenses);

    // Navigation handler for the "New" button in the ActionHeader
    const handleNewClick = () => {
        // Navigate to the create page which has the tabs
        navigate('/expenses/new'); 
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    {/* Add the ActionHeader */}
                    <ActionHeader
                        title={t('expenses.allExpensesTitle', 'All Expenses')}
                        onNewClick={handleNewClick}
                    />
                    
                    {/* The table view for Expenses */}
                    <div className="dashboard-card">
                        {expenses.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm font-sans">
                                    <thead className="bg-background border-b border-borderDefault">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-primary">{t('expenses.table.date', 'Date')}</th>
                                            <th className="p-3 text-left font-semibold text-primary">{t('expenses.table.category', 'Category')}</th>
                                            <th className="p-3 text-left font-semibold text-primary">{t('expenses.table.vendor', 'Vendor/Employee')}</th>
                                            <th className="p-3 text-center font-semibold text-primary">{t('common.status', 'Status')}</th>
                                            <th className="p-3 text-right font-semibold text-primary">{t('expenses.table.amount', 'Amount')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenses.map(exp => (
                                            <tr key={exp.id} className="border-b border-borderLight hover:bg-background/50">
                                                <td className="p-3 text-secondary">{exp.date}</td>
                                                <td className="p-3">
                                                    <Link to={`/expenses/${exp.id}`} className="text-primary font-medium hover:text-accent hover:underline">
                                                        {exp.category}
                                                    </Link>
                                                </td>
                                                <td className="p-3 text-secondary">{exp.vendor}</td>
                                                <td className="p-3 text-center">
                                                    <span className={`status-badge ${exp.status === 'Reimbursed' ? 'status-paid' : 'status-sent'}`}>
                                                        {exp.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-right text-primary font-semibold">₹{exp.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-heading text-primary mb-2">{t('expenses.noExpensesTitle', 'No Expenses Recorded')}</h3>
                                <p className="text-secondary font-sans mb-6">{t('expenses.noExpensesSubtitle', 'Record your first expense by clicking the "New" button.')}</p>
                                <button onClick={handleNewClick} className="font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-5 py-2.5 rounded-lg shadow-md">
                                    {t('expenses.recordFirstExpenseBtn', 'Record Expense')}
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

 export default ExpensesListPage;