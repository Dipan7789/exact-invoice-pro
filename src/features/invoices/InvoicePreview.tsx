import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { calculateTotals, currencySymbol, displayDate, formatMoney, type Invoice } from "./model";

export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  const totals = calculateTotals(invoice); const [qr, setQr] = useState("");
  useEffect(() => { if (!invoice.profile.upiId) { setQr(""); return; } QRCode.toDataURL(`upi://pay?pa=${encodeURIComponent(invoice.profile.upiId)}&pn=${encodeURIComponent(invoice.profile.paymentName || invoice.profile.businessName)}&am=${totals.balance.toFixed(2)}&cu=INR`, { margin: 1, width: 240 }).then(setQr); }, [invoice.profile.upiId, invoice.profile.paymentName, invoice.profile.businessName, totals.balance]);
  const clientAddress = [invoice.client.address, invoice.client.city, invoice.client.state, invoice.client.postalCode].filter(Boolean).join(", ");
  return <article className="invoice-sheet" aria-label="Live invoice preview">
    <header className="invoice-head">
      <div className="invoice-title-row"><h2>Invoice</h2><div className="invoice-no"><span>Invoice No.</span><strong>{invoice.invoiceNumber || "#—"}</strong></div></div>
      <div className="invoice-head-grid"><div><span className="invoice-label">Billed To:</span><h3>{invoice.client.name || "CLIENT / COMPANY NAME"}</h3><p>{clientAddress || "Client address, city, state, PIN / ZIP"}{invoice.client.gstin ? `, GSTIN: ${invoice.client.gstin}` : ""}</p></div><div className="invoice-date"><span>Issued on</span><strong>Date: {displayDate(invoice.invoiceDate)}</strong>{invoice.dueDate && <small>Due: {displayDate(invoice.dueDate)}</small>}</div></div>
    </header>
    <section className="invoice-services">
      <div className="invoice-table-head"><strong>Services</strong><span>Qty.</span><span>Price</span><span>Total</span></div>
      <div className="invoice-rows">{invoice.items.map((item) => <div className="invoice-row" key={item.id}><strong>{item.description || "Service description"}</strong><span>{item.quantity}</span><span>{formatMoney(item.rate, invoice.currency)}</span><span>{formatMoney(item.quantity * item.rate, invoice.currency)}</span></div>)}</div>
    </section>
    <section className="invoice-summary">
      <div className="summary-lines">
        <div><strong>Subtotal</strong><b>{formatMoney(totals.subtotal, invoice.currency)}</b></div>
        {totals.discount > 0 && <div><span>Discount</span><span>−{formatMoney(totals.discount, invoice.currency)}</span></div>}
        {totals.tax > 0 && <div><span>GST / Tax ({invoice.taxRate}%)</span><span>{formatMoney(totals.tax, invoice.currency)}</span></div>}
        <div className="total-line"><strong>Total</strong><b>{formatMoney(totals.total, invoice.currency)}</b></div>
        {invoice.advancePaid > 0 && <div><span>Advance paid</span><span>−{formatMoney(invoice.advancePaid, invoice.currency)}</span></div>}
      </div>
      <div className="balance-box"><span>{totals.balance <= .005 ? "Payment status" : `Balance Due (${invoice.currency})`}</span><strong className={totals.balance <= .005 ? "is-paid" : ""}>{totals.balance <= .005 ? "PAID" : `${currencySymbol(invoice.currency)}${new Intl.NumberFormat(invoice.currency === "INR" ? "en-IN" : "en-US").format(totals.balance)}`}</strong></div>
    </section>
    <footer className="invoice-payment"><div><span>Payment Method / UPI ID</span><strong>{invoice.profile.paymentName || invoice.profile.businessName}</strong>{invoice.profile.upiId && <b>UPI ID: {invoice.profile.upiId}</b>}{invoice.notes && <p>{invoice.notes}</p>}</div>{qr && <img src={qr} alt="UPI payment QR code" />}</footer>
  </article>;
}
