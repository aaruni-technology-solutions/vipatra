// src/pages/Admin/AuditLogsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from '@heroicons/react/solid';

// --- NEW HELPER COMPONENT FOR DISPLAYING DATA DIFFS ---
// This component formats and displays the JSON data for "before" and "after" states.
// --- JsonDiffViewer COMPONENT (Recommended version for black text) ---
const JsonDiffViewer = ({ data_before, data_after }) => {
    if (!data_before && !data_after) return null;
    
    return (
        <div className="mt-4 pt-4 border-t border-borderLight">
            <h4 className="font-sans font-semibold text-primary mb-2">Data Changes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="font-sans text-sm text-secondary mb-1">Before</p>
                    {/* 
                      CHANGE IS HERE: 
                      - Background is now a light red ('bg-red-100')
                      - Text is now black ('text-black')
                    */}
                    <pre className="bg-red-100 text-black p-3 rounded-md text-xs whitespace-pre-wrap break-all">
                        {data_before ? JSON.stringify(data_before, null, 2) : 'N/A (New Record)'}
                    </pre>
                </div>
                <div>
                    <p className="font-sans text-sm text-secondary mb-1">After</p>
                    {/* 
                      CHANGE IS HERE: 
                      - Background is now a light green ('bg-green-100')
                      - Text is now black ('text-black')
                    */}
                    <pre className="bg-green-100 text-black p-3 rounded-md text-xs whitespace-pre-wrap break-all">
                        {data_after ? JSON.stringify(data_after, null, 2) : 'N/A'}
                    </pre>
                </div>
            </div>
        </div>
    );
};

// --- UPDATED DUMMY DATA TO MATCH YOUR NEW SCHEMA ---
const getDummyAuditLogs = () => [
    {
        id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        tenant_id: 't1-enterprise',
        service_name: 'invoice-service',
        user_id: 'u2-alice',
        userName: 'Alice Johnson', // Added for display, would be a JOIN in a real app
        action: 'UPDATE',
        entity_type: 'Invoice',
        entity_id: 'inv-0078',
        timestamp: '2024-05-21T10:05:14Z',
        correlation_id: 'corr-abc-123-xyz',
        request_id: 'req-invoice-987',
        source_ip: '203.0.113.45',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0;...)',
        request_url: '/api/v1/invoices/78',
        http_method: 'PUT',
        status: 'SUCCESS',
        error_message: null,
        data_before: { status: 'Partially Paid', amount: 5000 },
        data_after: { status: 'Paid', amount: 5000, payment_date: '2024-05-21' },
    },
    {
        id: 'b2c3d4e5-f6a7-8901-2345-67890abcdef0',
        tenant_id: 't1-enterprise',
        service_name: 'customer-service',
        user_id: 'u3-bob',
        userName: 'Bob Williams',
        action: 'CREATE',
        entity_type: 'Customer',
        entity_id: 'cust-0005',
        timestamp: '2024-05-21T09:30:00Z',
        correlation_id: 'corr-def-456-uvw',
        request_id: 'req-customer-654',
        source_ip: '198.51.100.12',
        user_agent: 'Mozilla/5.0 (Macintosh;...)',
        request_url: '/api/v1/customers',
        http_method: 'POST',
        status: 'SUCCESS',
        error_message: null,
        data_before: null,
        data_after: { name: 'GreenScape Gardens', contact_email: 'contact@greenscape.com' },
    },
    {
        id: 'c3d4e5f6-a7b8-9012-3456-7890abcdef01',
        tenant_id: 't1-enterprise',
        service_name: 'payment-service',
        user_id: 'u2-alice',
        userName: 'Alice Johnson',
        action: 'PAY',
        entity_type: 'Invoice',
        entity_id: 'inv-0079',
        timestamp: '2024-05-20T15:00:25Z',
        correlation_id: 'corr-ghi-789-jkl',
        request_id: 'req-payment-321',
        source_ip: '203.0.113.45',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0;...)',
        request_url: '/api/v1/invoices/79/pay',
        http_method: 'POST',
        status: 'FAILURE',
        error_message: 'Payment declined by gateway: Insufficient funds.',
        data_before: { status: 'Due' },
        data_after: { status: 'Due', last_payment_attempt: '2024-05-20T15:00:25Z' },
    },
    {
        id: 'd4e5f6a7-b8c9-0123-4567-890abcdef012',
        tenant_id: 't1-enterprise',
        service_name: 'notification-service',
        user_id: null, // System event
        userName: 'System',
        action: 'SEND',
        entity_type: 'Reminder',
        entity_id: 'rem-inv-0077',
        timestamp: '2024-05-19T18:00:00Z',
        correlation_id: 'corr-job-789-rst',
        request_id: 'job-reminders-batch-1',
        source_ip: null,
        user_agent: 'System-Cron-Job/1.0',
        request_url: null,
        http_method: 'INTERNAL',
        status: 'SUCCESS',
        error_message: null,
        data_before: null,
        data_after: { recipient_count: 1, template: 'overdue_level_1' },
    }
];

// This function can be adapted for the new filters later
const getUniqueFilterOptions = (logs) => {
    const users = new Map();
    const actions = new Set();
    logs.forEach(log => {
        if (log.user_id) { users.set(log.user_id, log.userName); } 
        else { users.set('system', 'System'); }
        actions.add(log.action);
    });
    return {
        users: Array.from(users.entries()).map(([id, name]) => ({ id, name })),
        actions: Array.from(actions)
    };
};

const AuditLogsPage = () => {
    const { t } = useTranslation();
    const [masterLogList, setMasterLogList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({ user: '', action: '', dateFrom: '', dateTo: '' });
    const [expandedRowId, setExpandedRowId] = useState(null);

    // const filterOptions = useMemo(() => getUniqueFilterOptions(masterLogList), [masterLogList]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setMasterLogList(getDummyAuditLogs());
            setIsLoading(false);
        }, 500);
    }, []);

    const handleFilterChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const resetFilters = () => setFilters({ user: '', action: '', dateFrom: '', dateTo: '' });
    const handleRowToggle = (logId) => setExpandedRowId(prevId => (prevId === logId ? null : logId));

    // The filtering logic can be enhanced later to use the new fields
    const filteredLogs = masterLogList; // For now, show all logs

    const getStatusBadge = (status) => {
        const colorClasses = status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
        return <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${colorClasses}`}>{status}</span>;
    };
    
    return (
        <div className="flex flex-col h-full p-6 sm:p-8">
            <section className="mb-6">
                <h2 className="text-3xl font-heading text-primary">{t('auditLogs.title', 'Audit Logs')}</h2>
                <p className="text-secondary font-sans mt-1">{t('auditLogs.subtitle', 'Track all important activities within your organization.')}</p>
            </section>
           

            <div className="dashboard-card flex flex-col flex-grow overflow-hidden">
                <div className="flex-grow overflow-auto">
                    <table className="w-full min-w-[900px] text-sm font-sans border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th className="sticky top-0 z-10 bg-cardBg p-3 w-12"></th>
                                <th className="sticky top-0 z-10 bg-cardBg p-3 text-left font-semibold text-primary">Status</th>
                                <th className="sticky top-0 z-10 bg-cardBg p-3 text-left font-semibold text-primary">Action</th>
                                <th className="sticky top-0 z-10 bg-cardBg p-3 text-left font-semibold text-primary">Target</th>
                                <th className="sticky top-0 z-10 bg-cardBg p-3 text-left font-semibold text-primary">User</th>
                                <th className="sticky top-0 z-10 bg-cardBg p-3 text-left font-semibold text-primary">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="6" className="text-center p-6 text-secondary">{t('common.loading', 'Loading...')}</td></tr>
                            ) : filteredLogs.length > 0 ? (
                                filteredLogs.map(log => (
                                    <React.Fragment key={log.id}>
                                        <tr className="hover:bg-background/50 cursor-pointer" onClick={() => handleRowToggle(log.id)}>
                                            <td className="p-3 text-secondary border-b border-borderLight text-center">
                                                <ChevronRightIcon className={`w-5 h-5 transition-transform duration-200 ${expandedRowId === log.id ? 'rotate-90' : ''}`} />
                                            </td>
                                            <td className="p-3 border-b border-borderLight whitespace-nowrap">{getStatusBadge(log.status)}</td>
                                            <td className="p-3 text-primary font-medium border-b border-borderLight whitespace-nowrap">{log.action} {log.entity_type}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight font-mono text-xs">{log.entity_id}</td>
                                            <td className="p-3 text-primary border-b border-borderLight whitespace-nowrap">{log.userName}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">{new Date(log.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                        </tr>
                                        {expandedRowId === log.id && (
                                            <tr className="bg-background">
                                                <td colSpan="6" className="p-0">
                                                    <div className="p-4">
                                                        {log.status === 'FAILURE' && log.error_message && (
                                                            <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-md">
                                                                <p className="font-sans font-semibold text-red-200 mb-1">Error Message</p>
                                                                <p className="font-mono text-xs text-red-300">{log.error_message}</p>
                                                            </div>
                                                        )}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-xs">
                                                            <div><p className="font-sans font-semibold text-primary mb-1">Service</p><p className="font-mono text-secondary">{log.service_name}</p></div>
                                                            <div><p className="font-sans font-semibold text-primary mb-1">Correlation ID</p><p className="font-mono text-secondary">{log.correlation_id}</p></div>
                                                            <div><p className="font-sans font-semibold text-primary mb-1">Request ID</p><p className="font-mono text-secondary">{log.request_id}</p></div>
                                                            <div><p className="font-sans font-semibold text-primary mb-1">Source IP</p><p className="font-mono text-secondary">{log.source_ip || 'N/A'}</p></div>
                                                            <div className="lg:col-span-2"><p className="font-sans font-semibold text-primary mb-1">Request</p><p className="font-mono text-secondary"><span className="font-sans font-bold text-primary">{log.http_method}</span> {log.request_url || 'N/A'}</p></div>
                                                            <div className="lg:col-span-3"><p className="font-sans font-semibold text-primary mb-1">User Agent</p><p className="font-mono text-secondary break-all">{log.user_agent || 'N/A'}</p></div>
                                                        </div>
                                                        <JsonDiffViewer data_before={log.data_before} data_after={log.data_after} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr><td colSpan="6" className="text-center p-6 text-secondary">{t('auditLogs.noLogsFound', 'No audit logs found.')}</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                 <div className="flex-shrink-0 mt-auto p-3 border-t border-borderLight flex justify-end items-center font-sans text-sm text-secondary">
                    <span>{t('common.showingRecords', 'Showing {{count}} of {{total}} records', { count: filteredLogs.length, total: masterLogList.length })}</span>
                </div>
            </div>
        </div>
    );
};

export default AuditLogsPage;