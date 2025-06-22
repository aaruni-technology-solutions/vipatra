// src/pages/Admin/AuditLogsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Dummy data generator (expanded for scrolling)
const getDummyAuditLogs = () => [
    {
        audit_log_id: 101,
        organization_id: 1,
        user_id: 2,
        userName: 'Alice Johnson', // Joined from Users table
        timestamp: '2024-05-21T10:05:14Z',
        event_type: 'invoice_created',
        entity_type: 'invoice',
        entity_id: 78,
        description: 'Created Invoice INV-0078 for customer "Wellness Clinic".'
    },
    {
        audit_log_id: 102,
        organization_id: 1,
        user_id: 3,
        userName: 'Bob Williams', // Joined from Users table
        timestamp: '2024-05-21T09:30:00Z',
        event_type: 'customer_updated',
        entity_type: 'customer',
        entity_id: 1,
        description: 'Updated contact information for customer "Wellness Clinic".'
    },
    {
        audit_log_id: 103,
        organization_id: 1,
        user_id: 2,
        userName: 'Alice Johnson',
        timestamp: '2024-05-20T14:22:30Z',
        event_type: 'payment_recorded',
        entity_type: 'payment',
        entity_id: 1,
        description: 'Recorded a payment of ₹1,500.00 for Invoice INV-0075.'
    },
    {
        audit_log_id: 104,
        organization_id: 1,
        user_id: 4,
        userName: 'Charlie Brown',
        timestamp: '2024-05-20T11:00:00Z',
        event_type: 'user_login_success',
        entity_type: 'user',
        entity_id: 4,
        description: 'Successfully logged in.'
    },
    {
        audit_log_id: 105,
        organization_id: 1,
        user_id: null, // System events might not have a user
        userName: 'System',
        timestamp: '2024-05-19T18:00:00Z',
        event_type: 'reminder_sent',
        entity_type: 'invoice',
        entity_id: 77,
        description: 'Sent overdue payment reminder for Invoice INV-0077.'
    },
    {
        audit_log_id: 106,
        organization_id: 1,
        user_id: 3,
        userName: 'Bob Williams',
        timestamp: '2024-05-18T16:45:10Z',
        event_type: 'settings_updated',
        entity_type: 'organization',
        entity_id: 1,
        description: 'Updated tax settings for the organization.'
    }
];

const getUniqueFilterOptions = (logs) => {
    const users = new Map();
    const eventTypes = new Set();
    logs.forEach(log => {
        if (log.user_id) { users.set(log.user_id, log.userName); } 
        else { users.set('system', 'System'); }
        eventTypes.add(log.event_type);
    });
    return {
        users: Array.from(users.entries()).map(([id, name]) => ({ id, name })),
        eventTypes: Array.from(eventTypes)
    };
};

const AuditLogsPage = () => {
    const { t } = useTranslation();
    const [masterLogList, setMasterLogList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({ user: '', eventType: '', dateFrom: '', dateTo: '' });

    const filterOptions = useMemo(() => getUniqueFilterOptions(masterLogList), [masterLogList]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const data = getDummyAuditLogs();
            setMasterLogList(data);
            setIsLoading(false);
        }, 500);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    
    const resetFilters = () => {
        setFilters({ user: '', eventType: '', dateFrom: '', dateTo: '' });
    };

    const filteredLogs = useMemo(() => {
        return masterLogList.filter(log => {
            const logDate = new Date(log.timestamp);
            const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
            const dateTo = filters.dateTo ? new Date(filters.dateTo) : null;
            if (dateTo) dateTo.setHours(23, 59, 59, 999);
            const userMatch = !filters.user || String(log.user_id || 'system') === filters.user;
            const eventTypeMatch = !filters.eventType || log.event_type === filters.eventType;
            const dateFromMatch = !dateFrom || logDate >= dateFrom;
            const dateToMatch = !dateTo || logDate <= dateTo;
            return userMatch && eventTypeMatch && dateFromMatch && dateToMatch;
        });
    }, [masterLogList, filters]);
    
    const getEventTypeBadge = (eventType) => {
        let colorClasses = 'bg-gray-100 text-gray-800';
        if (eventType.includes('created')) colorClasses = 'bg-green-100 text-green-800';
        if (eventType.includes('updated')) colorClasses = 'bg-blue-100 text-blue-800';
        if (eventType.includes('deleted') || eventType.includes('void')) colorClasses = 'bg-red-100 text-red-800';
        if (eventType.includes('sent') || eventType.includes('login')) colorClasses = 'bg-yellow-100 text-yellow-800';
        if (eventType.includes('payment')) colorClasses = 'bg-purple-100 text-purple-800';
        
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses}`}>
                {t(`auditLogs.eventTypes.${eventType}`, eventType.replace(/_/g, ' '))}
            </span>
        );
    };

    return (
        <div className="flex flex-col h-full p-6 sm:p-8">
            {/* NON-SCROLLING HEADER AREA */}
            <section className="mb-6">
                <h2 className="text-3xl font-heading text-primary">{t('auditLogs.title', 'Audit Logs')}</h2>
                <p className="text-secondary font-sans mt-1">{t('auditLogs.subtitle', 'Track all important activities within your organization.')}</p>
            </section>
            
            
            {/* MAIN CONTENT CONTAINER */}
            <div className="dashboard-card flex flex-col flex-grow overflow-hidden">
                {isLoading ? (
                     <div className="flex-grow flex items-center justify-center text-secondary">{t('common.loading', 'Loading...')}</div>
                ) : filteredLogs.length > 0 ? (
                    <>
                        {/* SCROLLABLE TABLE WRAPPER */}
                        <div className="flex-grow overflow-auto">
                            <table className="w-full min-w-[800px] text-sm font-sans border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        {/* STICKY HEADER CELLS */}
                                        <th className="sticky top-0 z-10 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Timestamp</th>
                                        <th className="sticky top-0 z-10 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">User</th>
                                        <th className="sticky top-0 z-10 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Event</th>
                                        <th className="sticky top-0 z-10 bg-background p-3 text-left font-semibold text-primary border-b border-borderDefault">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLogs.map(log => (
                                        <tr key={log.audit_log_id} className="hover:bg-background/50">
                                            <td className="p-3 text-secondary border-b border-borderLight whitespace-nowrap">
                                                {new Date(log.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                            </td>
                                            <td className="p-3 text-primary font-medium border-b border-borderLight whitespace-nowrap">{log.userName}</td>
                                            <td className="p-3 border-b border-borderLight whitespace-nowrap">{getEventTypeBadge(log.event_type)}</td>
                                            <td className="p-3 text-secondary border-b border-borderLight">
                                                {log.description}
                                                {log.entity_type && log.entity_id && ['customer', 'invoice'].includes(log.entity_type) && (
                                                    <Link to={`/${log.entity_type}s/${log.entity_id}`} className="text-xs text-primary hover:underline ml-2">
                                                        [{t('common.view', 'View')}]
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* PAGINATION FOOTER */}
                        <div className="flex-shrink-0 mt-auto p-3 border-t border-borderLight flex justify-end items-center font-sans text-sm text-secondary">
                            <span>{t('common.showingRecords', 'Showing {{count}} of {{total}} records', { count: filteredLogs.length, total: masterLogList.length })}</span>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-xl font-heading text-primary mb-2">{t('auditLogs.noLogsFound', 'No Audit Logs Found')}</h3>
                            <p className="text-secondary font-sans">{t('auditLogs.noLogsForFilter', 'Try adjusting your filters or check back later.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuditLogsPage;