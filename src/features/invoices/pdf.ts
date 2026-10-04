import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { calculateTotals, currencySymbol, displayDate, type Invoice } from "./model";

const BLUE = [20, 126, 238] as const;
const INK = [15, 23, 42] as const;
const MUTED = [98, 116, 130] as const;
export async function downloadInvoicePdf(invoice: Invoice) {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const totals = calculateTotals(invoice); const left = 10; const right = 200; const width = 190;
  const money = (n: number) => `${currencySymbol(invoice.currency)}${new Intl.NumberFormat(invoice.currency === "INR" ? "en-IN" : "en-US", { maximumFractionDigits: 2 }).format(n)}`;
  const text = (value: string, x: number, y: number, size = 9, weight: "normal" | "bold" = "normal", color: readonly number[] = INK, options?: Parameters<typeof doc.text>[3]) => { doc.setFont("helvetica", weight); doc.setFontSize(size); doc.setTextColor(color[0], color[1], color[2]); doc.text(value, x, y, options); };
  const drawHeader = () => {
    doc.setFillColor(234, 248, 244); doc.roundedRect(left, 10, width, 62, 4, 4, "F");
    text("Invoice", 17, 24, 17, "bold"); text("Invoice No.", 193, 21, 8, "normal", MUTED, { align: "right" }); text(invoice.invoiceNumber, 193, 29, 12, "bold", INK, { align: "right" });
    text("Billed To:", 17, 38, 8, "normal", MUTED); text(invoice.client.name.toUpperCase(), 17, 48, 11, "bold");
    const address = [invoice.client.address, invoice.client.city, invoice.client.state, invoice.client.postalCode].filter(Boolean).join(", ") + (invoice.client.gstin ? `, GSTIN: ${invoice.client.gstin}` : "");
    const addressLines = doc.splitTextToSize(address, 118); text(addressLines, 17, 56, 7.5);
    text("Issued on", 193, 54, 8, "normal", MUTED, { align: "right" }); text(`Date: ${displayDate(invoice.invoiceDate)}`, 193, 61, 9, "bold", INK, { align: "right" });
    if (invoice.dueDate) text(`Due: ${displayDate(invoice.dueDate)}`, 193, 67, 7.5, "normal", MUTED, { align: "right" });
  };
  const drawTableHead = (y: number) => { text("Services", 17, y, 10, "bold"); text("Qty.", 110, y, 8, "normal", MUTED, { align: "right" }); text("Price", 154, y, 8, "normal", MUTED, { align: "right" }); text("Total", 193, y, 8, "normal", MUTED, { align: "right" }); };
  drawHeader(); drawTableHead(85); let y = 102;
  for (const item of invoice.items) {
    const lines = doc.splitTextToSize(item.description, 78); const rowHeight = Math.max(12, lines.length * 5 + 4);
    if (y + rowHeight > 235) { doc.addPage(); y = 20; drawTableHead(y); y += 15; }
    text(lines, 17, y, 8.5, "bold", BLUE); text(String(item.quantity), 110, y, 8.5, "normal", INK, { align: "right" }); text(money(item.rate), 154, y, 8.5, "bold", BLUE, { align: "right" }); text(money(item.quantity * item.rate), 193, y, 8.5, "bold", BLUE, { align: "right" }); y += rowHeight;
  }
  y = Math.max(y + 20, 145); if (y > 220) { doc.addPage(); y = 25; }
  doc.setDrawColor(222, 233, 232); doc.setLineWidth(.7); doc.line(14, y, 112, y);
  const summary: Array<[string, number, boolean?]> = [["Subtotal", totals.subtotal], ...(totals.discount ? [["Discount", -totals.discount] as [string, number]] : []), ...(totals.tax ? [[`GST / Tax (${invoice.taxRate}%)`, totals.tax] as [string, number]] : []), ["Total", totals.total, true], ...(invoice.advancePaid ? [["Advance paid", -invoice.advancePaid] as [string, number]] : [])];
  let sy = y + 7; for (const [label, amount, strong] of summary) { text(label, 17, sy, strong ? 10 : 8, strong ? "bold" : "normal", strong ? BLUE : MUTED); text(money(amount), 92, sy, strong ? 9 : 8, strong ? "bold" : "normal", strong ? BLUE : INK, { align: "right" }); sy += 7; }
  doc.setFillColor(246, 248, 251); doc.roundedRect(116, y + 2, 84, 18, 4, 4, "F"); text(totals.balance <= .005 ? "Paid" : "Balance Due", 123, y + 13, 8, "normal", MUTED); text(totals.balance <= .005 ? "PAID" : money(totals.balance), 193, y + 13, 9, "bold", totals.balance <= .005 ? [29, 142, 86] : BLUE, { align: "right" });
  const payY = Math.max(sy + 16, y + 38); text("Payment Method / UPI ID", 14, payY, 8, "normal", MUTED); text((invoice.profile.paymentName || invoice.profile.businessName).toUpperCase(), 14, payY + 10, 11, "bold"); if (invoice.profile.upiId) text(`UPI ID: ${invoice.profile.upiId}`, 14, payY + 19, 11, "bold");
  if (invoice.profile.upiId) { const qr = await QRCode.toDataURL(`upi://pay?pa=${encodeURIComponent(invoice.profile.upiId)}&pn=${encodeURIComponent(invoice.profile.paymentName || invoice.profile.businessName)}&am=${totals.balance.toFixed(2)}&cu=INR`); doc.addImage(qr, "PNG", 164, payY + 1, 31, 31); }
  if (invoice.notes) text(doc.splitTextToSize(invoice.notes, 130), 14, Math.min(280, payY + 38), 7.5, "normal", MUTED);
  const safe = invoice.invoiceNumber.replace(/[^a-z0-9_-]/gi, "-"); doc.save(`Invoice-${safe}.pdf`);
}
