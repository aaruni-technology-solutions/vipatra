// src/pages/Invoices/InvoiceViewPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // To get invoiceId from URL
import { useTranslation } from 'react-i18next';

// Dummy data for a single invoice - replace with API call using invoiceId
const getDummyInvoiceData = (invoiceId) => ({
    id: invoiceId || "INV-2024-0078",
    clientName: "Wellness Clinic Pvt. Ltd.",
    status: "Partially Paid",
    statusClass: "status-partial", // from your global CSS
    issueDate: "May 10, 2024",
    dueDate: "May 25, 2024",
    eInvoice: {
        status: "generated", // 'generated', 'pending', 'not_applicable'
        irn: "35ADFXS1234G1Z42405101234567890123456",
        ackNo: "123456789012345",
        ackDate: "May 10, 2024, 11:30 AM",
        qrCodeUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" // Placeholder
    },
    items: [
        { id: 1, description: "Wellness Consultation", qty: 1, unitPrice: "2000.00", taxPercent: "18", amount: "2360.00" },
        { id: 2, description: "Herbal Supplement Pack", qty: 1, unitPrice: "966.10", taxPercent: "18", amount: "1140.00" }
    ],
    subtotal: "2966.10",
    totalTax: "533.90", // Assuming this is the calculated total tax amount
    gstRate: "18", // The rate used for the totalTax string
    discount: "0.00",
    grandTotal: "3500.00",
    amountPaid: "1500.00",
    remainingBalance: "2000.00",
    payments: [
        { id: 1, date: "May 20, 2024", amount: "1000.00", method: "UPI", reference: "UP12345XYZ", notes: "" },
        { id: 2, date: "May 15, 2024", amount: "500.00", method: "Cash", reference: "", notes: "Advance payment" }
    ]
});


const InvoiceViewPage = () => {
    const { t } = useTranslation();
    const { invoiceId } = useParams(); // Get invoiceId from URL if your route is /invoices/:invoiceId
    const [invoice, setInvoice] = useState(null);

    // --- State for Payment Form ---
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0,10)); // Default to today
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [paymentReference, setPaymentReference] = useState('');
    const [paymentNotes, setPaymentNotes] = useState('');


    useEffect(() => {
        // In a real app, fetch invoice data from API using invoiceId
        console.log("Fetching invoice for ID:", invoiceId);
        const data = getDummyInvoiceData(invoiceId); // Using dummy data
        setInvoice(data);
    }, [invoiceId]);

    const handleRecordPayment = (e) => {
        e.preventDefault();
        const paymentData = {
            amount: paymentAmount,
            date: paymentDate,
            method: selectedPaymentMethod,
            reference: paymentReference,
            notes: paymentNotes,
        };
        console.log("Recording payment:", paymentData, "for invoice:", invoice.id);
        alert(t('invoiceView.paymentManagement.recordPaymentForm.paymentRecordedMsg', 'Payment recorded (check console)! In a real app, this would update the invoice.'));
        // Reset form or update invoice data after successful API call
        setPaymentAmount('');
        // setSelectedPaymentMethod(''); // Might want to keep it selected
        setPaymentReference('');
        setPaymentNotes('');
        // You would then re-fetch invoice data or update local state
    };


    if (!invoice) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>{t('common.loading', 'Loading invoice details...')}</p>
            </div>
        );
    }

    const paymentMethods = [
        { value: 'upi', labelKey: 'invoiceView.paymentManagement.paymentMethods.upi' },
        { value: 'card', labelKey: 'invoiceView.paymentManagement.paymentMethods.card' },
        { value: 'net_banking', labelKey: 'invoiceView.paymentManagement.paymentMethods.netBanking' },
        { value: 'cash', labelKey: 'invoiceView.paymentManagement.paymentMethods.cash' },
        { value: 'emi', labelKey: 'invoiceView.paymentManagement.paymentMethods.emi' },
    ];


    return (
        <main className="p-6 sm:p-8">
            {/* Invoice Header */}
            <section className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <h2 className="text-3xl font-heading text-primary">{t('invoiceView.title', { invoiceId: invoice.id })}</h2>
                        <p className="text-secondary font-sans">{t('invoiceView.clientLabel')} {invoice.clientName}</p>
                    </div>
                    <div className="mt-3 sm:mt-0 text-left sm:text-right">
                        <span className={`status-badge ${invoice.statusClass}`}>{t(`status.${invoice.status.toLowerCase().replace(/\s+/g, '')}`, invoice.status)}</span>
                        <p className="text-sm text-secondary font-sans mt-1">{t('invoiceView.issuedLabel')} {invoice.issueDate}</p>
                        <p className="text-sm text-secondary font-sans">{t('invoiceView.dueLabel')} {invoice.dueDate}</p>
                    </div>
                </div>
            </section>

            {/* Invoice Actions Bar */}
            <section className="mb-8 flex flex-wrap gap-3 items-center">
                <button className="font-sans text-sm bg-primary hover:bg-primary-dark text-textOnPrimary px-4 py-2 rounded-lg shadow-soft flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>{t('invoiceView.actions.downloadPDF')}</span>
                </button>
                <button className="font-sans text-sm bg-accent hover:bg-accent-dark text-textDark px-4 py-2 rounded-lg shadow-soft flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>{t('invoiceView.actions.sendReminder')}</span>
                </button>
                <Link to={`/invoices/edit/${invoice.id}`} className="font-sans text-sm bg-secondary hover:bg-secondary/80 text-textOnSecondary px-4 py-2 rounded-lg shadow-soft flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    <span>{t('invoiceView.actions.editInvoice')}</span>
                </Link>
                <button className="font-sans text-sm bg-danger-dark hover:bg-danger-dark text-textOnSecondary px-4 py-2 rounded-lg shadow-soft flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span>{t('invoiceView.actions.voidInvoice')}</span>
                </button>
            </section>

            {/* e-Invoice Status Section */}
            {invoice.eInvoice && (
                <section className="dashboard-card mb-6">
                    <h4 className="text-lg font-heading text-primary mb-3">{t('invoiceView.eInvoiceStatus.title')}</h4>
                    <div className="font-sans text-sm space-y-2">
                        {invoice.eInvoice.status === 'generated' && (
                            <div id="eInvoiceStatusView">
                                <p>{t('invoiceView.eInvoiceStatus.statusLabel')} <span className="font-semibold text-success-dark">{t('invoiceView.eInvoiceStatus.generated')}</span></p>
                                <p>{t('invoiceView.eInvoiceStatus.irnLabel')} <span className="font-mono text-secondary">{invoice.eInvoice.irn}</span></p>
                                <p>{t('invoiceView.eInvoiceStatus.ackNoLabel')} <span className="font-mono text-secondary">{invoice.eInvoice.ackNo}</span></p>
                                <p>{t('invoiceView.eInvoiceStatus.ackDateLabel')} <span className="text-secondary">{invoice.eInvoice.ackDate}</span></p>
                                <div className="mt-2">
                                    <img src={invoice.eInvoice.qrCodeUrl} alt="e-Invoice QR Code" className="border border-borderDefault w-32 h-32" />
                                </div>
                                {/* <button className="mt-3 font-sans text-xs bg-secondary text-textOnSecondary hover:bg-secondary/80 px-3 py-1.5 rounded-md">{t('invoiceView.actions.cancelIRN')}</button> */}
                            </div>
                        )}
                        {invoice.eInvoice.status === 'pending' && (
                            <div id="eInvoicePendingView">
                                <p>{t('invoiceView.eInvoiceStatus.statusLabel')} <span className="font-semibold text-warning-dark">{t('invoiceView.eInvoiceStatus.pending')}</span></p>
                                {/* <button className="mt-3 font-sans text-xs bg-primary text-textOnPrimary hover:bg-primary-dark px-3 py-1.5 rounded-md">{t('invoiceView.actions.generateEInvoiceNow')}</button> */}
                            </div>
                        )}
                        {invoice.eInvoice.status === 'not_applicable' && (
                             <p className="text-sm text-secondary">{t('invoiceView.eInvoiceStatus.notApplicable')}</p>
                        )}
                    </div>
                </section>
            )}


            {/* Invoice Details: Items & Totals */}
            <section className="dashboard-card mb-8">
                <h3 className="text-xl font-heading text-primary mb-4">{t('invoiceView.itemsSectionTitle')}</h3>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-sm font-sans">
                        <thead className="bg-background">
                            <tr>
                                <th className="p-3 text-left font-semibold text-primary">{t('invoiceView.table.itemService')}</th>
                                <th className="p-3 text-center font-semibold text-primary">{t('invoiceView.table.qty')}</th>
                                <th className="p-3 text-right font-semibold text-primary">{t('invoiceView.table.unitPrice')}</th>
                                <th className="p-3 text-right font-semibold text-primary">{t('invoiceView.table.tax')}</th>
                                <th className="p-3 text-right font-semibold text-primary">{t('invoiceView.table.amount')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map(item => (
                                <tr key={item.id} className="border-b border-borderLight">
                                    <td className="p-3 text-primary">{item.description}</td>
                                    <td className="p-3 text-center text-secondary">{item.qty}</td>
                                    <td className="p-3 text-right text-secondary">{item.unitPrice}</td>
                                    <td className="p-3 text-right text-secondary">{item.taxPercent}%</td>
                                    <td className="p-3 text-right text-primary font-semibold">₹{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="font-sans">
                            <tr><td colSpan="3"></td><td className="p-3 text-right text-secondary font-semibold">{t('invoiceView.table.subtotal')}</td><td className="p-3 text-right text-primary font-semibold">₹{invoice.subtotal}</td></tr>
                            <tr><td colSpan="3"></td><td className="p-3 text-right text-secondary">{t('invoiceView.table.totalTax', { rate: invoice.gstRate })}</td><td className="p-3 text-right text-primary">₹{invoice.totalTax}</td></tr>
                            {parseFloat(invoice.discount) > 0 && <tr><td colSpan="3"></td><td className="p-3 text-right text-secondary">{t('invoiceView.table.discount')}</td><td className="p-3 text-right text-primary">- ₹{invoice.discount}</td></tr>}
                            <tr><td colSpan="3"></td><td className="p-3 text-right text-xl font-heading text-primary">{t('invoiceView.table.grandTotal')}</td><td className="p-3 text-right text-xl font-heading text-primary font-bold">₹{invoice.grandTotal}</td></tr>
                        </tfoot>
                    </table>
                </div>
            </section>

            {/* Payment Collection & History Section */}
            <section id="paymentCollection" className="dashboard-card">
                <h3 className="text-2xl font-heading text-primary mb-6">{t('invoiceView.paymentManagement.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="p-4 bg-background rounded-lg">
                            <p className="text-sm font-sans text-secondary">{t('invoiceView.paymentManagement.invoiceTotal')} <span className="font-semibold text-primary text-lg">₹{invoice.grandTotal}</span></p>
                            <p className="text-sm font-sans text-secondary">{t('invoiceView.paymentManagement.amountPaid')} <span className="font-semibold text-success-dark text-lg">₹{invoice.amountPaid}</span></p>
                            <p className="text-lg font-sans text-danger-DEFAULT">{t('invoiceView.paymentManagement.remainingBalance')} <span className="font-semibold">₹{invoice.remainingBalance}</span></p>
                        </div>
                        {parseFloat(invoice.remainingBalance) > 0 && (
                            <form onSubmit={handleRecordPayment} className="space-y-5">
                                <div><label htmlFor="paymentAmount" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceView.paymentManagement.recordPaymentForm.amountReceived')} <span className="text-danger-DEFAULT">*</span></label><input type="number" id="paymentAmount" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} placeholder={t('common.enterAmount', 'Enter amount')} step="0.01" className="form-element" required /></div>
                                <div><label htmlFor="paymentDate" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceView.paymentManagement.recordPaymentForm.paymentDate')} <span className="text-danger-DEFAULT">*</span></label><input type="date" id="paymentDate" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className="form-element" required /></div>
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2 font-sans">{t('invoiceView.paymentManagement.recordPaymentForm.paymentMethod')} <span className="text-danger-DEFAULT">*</span></label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {paymentMethods.map(method => (
                                            <label key={method.value} className="flex items-center space-x-2 p-3 border border-borderDefault rounded-lg hover:border-primary hover:bg-background cursor-pointer transition-all">
                                                <input type="radio" name="paymentMethod" value={method.value} checked={selectedPaymentMethod === method.value} onChange={(e) => setSelectedPaymentMethod(e.target.value)} className="form-radio h-4 w-4 text-primary focus:ring-primary" required/>
                                                <span className="text-sm font-sans text-primary">{t(method.labelKey, method.value.toUpperCase())}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div><label htmlFor="paymentReference" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceView.paymentManagement.recordPaymentForm.referenceOptional')}</label><input type="text" id="paymentReference" value={paymentReference} onChange={e => setPaymentReference(e.target.value)} placeholder={t('invoiceView.paymentManagement.recordPaymentForm.referencePlaceholder')} className="form-element" /></div>
                                <div><label htmlFor="paymentNotes" className="block text-sm font-medium text-primary mb-1 font-sans">{t('invoiceView.paymentManagement.recordPaymentForm.notesOptional')}</label><textarea id="paymentNotes" value={paymentNotes} onChange={e => setPaymentNotes(e.target.value)} rows="2" placeholder={t('invoiceView.paymentManagement.recordPaymentForm.notesPlaceholder')} className="form-element"></textarea></div>
                                <div className="pt-3"><button type="submit" className="w-full sm:w-auto font-sans bg-primary hover:bg-primary-dark text-textOnPrimary px-6 py-3 rounded-lg shadow-soft transition-colors duration-200 flex items-center justify-center space-x-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>{t('invoiceView.paymentManagement.recordPaymentForm.recordPaymentBtn')}</span></button></div>
                            </form>
                        )}
                    </div>
                    <div className="md:col-span-1">
                        <h4 className="text-lg font-heading text-primary mb-4">{t('invoiceView.paymentManagement.paymentHistory.title')}</h4>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {invoice.payments.length > 0 ? invoice.payments.map(payment => (
                                <div key={payment.id} className="p-4 bg-background rounded-lg border border-borderLight">
                                    <div className="flex justify-between items-center mb-1"><p className="font-semibold font-sans text-primary">₹{payment.amount}</p><span className="text-xs font-sans px-2 py-0.5 rounded-full bg-primary/10 text-primary-dark">{t(`invoiceView.paymentManagement.paymentMethods.${payment.method.toLowerCase()}`, payment.method)}</span></div>
                                    <p className="text-xs font-sans text-secondary">{t('common.date', 'Date')}: {payment.date}</p>
                                    {payment.reference && <p className="text-xs font-sans text-secondary">{t('common.reference', 'Ref')}: {payment.reference}</p>}
                                    {payment.notes && <p className="text-xs font-sans text-secondary">{t('common.notes', 'Notes')}: {payment.notes}</p>}
                                </div>
                            )) : (
                                <p className="text-sm font-sans text-secondary">{t('invoiceView.paymentManagement.paymentHistory.noPayments')}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default InvoiceViewPage;