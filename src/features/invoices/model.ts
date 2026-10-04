import { z } from "zod";

export const currencies = ["INR", "USD", "EUR", "GBP"] as const;
export const statuses = ["Draft", "Unpaid", "Partially paid", "Paid"] as const;

export const profileSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(120),
  profession: z.string().trim().max(100), address: z.string().trim().max(240), city: z.string().trim().max(100),
  state: z.string().trim().max(100), postalCode: z.string().trim().max(20), gstin: z.string().trim().max(30),
  email: z.string().trim().email("Enter a valid email").or(z.literal("")), phone: z.string().trim().max(30),
  website: z.string().trim().max(180), paymentName: z.string().trim().max(120), upiId: z.string().trim().max(100),
});
export const clientSchema = z.object({
  name: z.string().trim().min(1, "Client name is required").max(140), address: z.string().trim().max(240),
  city: z.string().trim().max(100), state: z.string().trim().max(100), postalCode: z.string().trim().max(20),
  gstin: z.string().trim().max(30), email: z.string().trim().email("Enter a valid email").or(z.literal("")),
});
export const itemSchema = z.object({ id: z.string(), description: z.string().trim().min(1, "Add a description").max(500), quantity: z.number().finite().min(0), rate: z.number().finite().min(0) });
export const invoiceSchema = z.object({
  id: z.string(), profile: profileSchema, client: clientSchema,
  invoiceNumber: z.string().trim().min(1, "Invoice number is required").max(40),
  invoiceDate: z.string().min(1, "Invoice date is required"), dueDate: z.string(),
  currency: z.enum(currencies), status: z.enum(statuses), items: z.array(itemSchema).min(1),
  discount: z.number().finite().min(0), taxRate: z.number().finite().min(0).max(100), advancePaid: z.number().finite().min(0),
  notes: z.string().max(500), createdAt: z.string(), updatedAt: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
export type Client = z.infer<typeof clientSchema>;
export type InvoiceItem = z.infer<typeof itemSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type Totals = { subtotal: number; discount: number; taxable: number; tax: number; total: number; balance: number };

export const defaultProfile: Profile = { businessName: "Dipan Chakraborty", profession: "Motion Designer", address: "", city: "", state: "", postalCode: "", gstin: "", email: "", phone: "", website: "https://dipanmotion.framer.website", paymentName: "DIPAN CHAKRABORTY", upiId: "" };
const isoDay = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); };
export const newInvoice = (profile: Profile, invoiceNumber: string): Invoice => ({ id: crypto.randomUUID(), profile: { ...profile }, client: { name: "", address: "", city: "", state: "", postalCode: "", gstin: "", email: "" }, invoiceNumber, invoiceDate: isoDay(), dueDate: isoDay(14), currency: "INR", status: "Unpaid", items: [{ id: crypto.randomUUID(), description: "Podcast Editing", quantity: 1, rate: 2000 }], discount: 0, taxRate: 0, advancePaid: 0, notes: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
export const calculateTotals = (invoice: Invoice): Totals => { const subtotal = invoice.items.reduce((sum, item) => sum + Math.max(0, item.quantity) * Math.max(0, item.rate), 0); const discount = Math.min(Math.max(0, invoice.discount), subtotal); const taxable = subtotal - discount; const tax = taxable * Math.max(0, invoice.taxRate) / 100; const total = taxable + tax; return { subtotal, discount, taxable, tax, total, balance: Math.max(0, total - Math.max(0, invoice.advancePaid)) }; };
export const currencySymbol = (currency: Invoice["currency"]) => ({ INR: "₹", USD: "$", EUR: "€", GBP: "£" })[currency];
export const formatMoney = (value: number, currency: Invoice["currency"]) => new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(Number.isFinite(value) ? value : 0);
export const displayDate = (value: string) => value ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`)) : "—";
export const nextInvoiceNumber = (invoices: Invoice[]) => `#${String(Math.max(0, ...invoices.map((i) => Number(i.invoiceNumber.replace(/\D/g, "")) || 0)) + 1).padStart(2, "0")}`;
