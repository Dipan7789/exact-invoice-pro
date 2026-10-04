# Perfect Invoice Studio

Build a professional Invoice Generator web app for a freelancer/creative professional.



I am uploading a reference invoice PDF. Use the uploaded invoice as the primary visual and structural reference for the generated invoice.



IMPORTANT — Reference Design



Analyze the uploaded invoice carefully and recreate its visual structure, spacing, typography hierarchy, alignment, proportions, borders, tables, and information placement as closely as reasonably possible.



Do not simply create a generic invoice template.



The generated invoice should feel like the same invoice design as the uploaded reference, but all content must be dynamically generated from the user's input.



The reference invoice is a simple, clean, professional A4 invoice with:



- Business/company information at the top

- Business address and GSTIN

- Invoice/date information

- A clean line-item/service table

- Description, quantity/rate/amount structure

- Total amount section

- Minimal professional styling

- One-page A4 layout



APP PURPOSE



The workflow should be:



Enter invoice details → Preview invoice → Generate PDF → Download PDF



The user should not need to manually design anything.



---



1. Dashboard



Create a clean dashboard with:



Create New Invoice



and an invoice history section showing previously generated invoices.



For each invoice show:



- Invoice number

- Client name

- Invoice date

- Amount

- Payment status

- Download PDF button



---



2. Invoice Creation Form



Create a simple form divided into sections.



My Details



Fields:



- Name / Business Name

- Address

- City

- State

- PIN / ZIP

- GSTIN

- Email

- Phone

- Website



Allow these details to be saved as the default profile so they automatically appear on every new invoice.



Client Details



Fields:



- Client / Company Name

- Address

- City

- State

- PIN / ZIP

- GSTIN

- Email



Invoice Details



Fields:



- Invoice Number

- Invoice Date

- Due Date

- Currency

- Payment Status



Automatically suggest the next invoice number, but allow the user to edit it.



---



3. Invoice Items



Allow multiple items/services.



Each row should contain:



- Description

- Quantity

- Rate

- Amount



Automatically calculate:



Quantity × Rate = Amount



Include:



+ Add Item



and allow items to be removed.



Example:



Description: Podcast Editing

Quantity: 1

Rate: ₹2,000

Amount: ₹2,000



---



4. Payment & Tax



Support:



- Subtotal

- Discount

- GST / Tax

- Advance Paid

- Balance Due



Automatically calculate everything.



For example:



Subtotal: ₹2,000

Advance Paid: ₹1,000

Balance Due: ₹1,000



If the invoice is fully paid, display a clear PAID status.



---



5. Live Invoice Preview



Use a two-column desktop layout:



Left: Form

Right: Live invoice preview



The preview must update instantly whenever the user changes any information.



The preview should be rendered in an A4 aspect ratio and should visually match the uploaded reference invoice.



On mobile, stack the form and preview vertically.



---



6. PDF GENERATION



This is extremely important.



When the user clicks:



Download PDF



generate a real A4 PDF, not a screenshot.



The PDF must:



- Match the live preview

- Preserve the reference design

- Maintain correct margins

- Preserve typography

- Preserve table alignment

- Handle long descriptions

- Handle multiple invoice items

- Prevent text from overflowing

- Automatically handle page breaks if necessary

- Be suitable for sending directly to a client



The default invoice should ideally fit on one A4 page when the amount of content allows it.



---



7. Invoice History



Save created invoices locally.



Allow users to:



- View

- Edit

- Duplicate

- Download

- Delete



When duplicating an invoice, automatically generate a new invoice number while retaining the client information and line items.



---



8. Default Freelancer Profile



Allow the user to save their own invoice information once.



Use these as initial example values:



Name: Dipan Chakraborty

Profession: Motion Designer

Website: https://dipanmotion.framer.website



These should only be defaults and must be editable.



---



9. Design Requirements



Keep the invoice itself extremely close to the uploaded reference.



Do not add unnecessary:



- Illustrations

- Large colorful graphics

- Marketing sections

- Excessive icons

- Decorative elements



The invoice should remain professional, minimal and business-focused.



The app interface itself can be modern and polished, but the generated invoice must prioritize fidelity to the uploaded reference.



---



10. Technical Requirements



Build this as a fully functional web application.



Use a reliable PDF-generation method that produces selectable text and a professional A4 document rather than simply exporting a screenshot.



Make calculations reliable and prevent invalid values.



Validate required fields before generating the invoice.



Use Indian Rupee formatting when INR is selected, including proper ₹ formatting.



Make the application responsive for desktop, tablet and mobile.



---



FINAL REQUIREMENT



The uploaded invoice PDF is the source of truth for the invoice's visual design.



Do not redesign it into a generic modern invoice.



Instead:



Reference PDF → Analyze layout → Recreate design → Connect dynamic invoice data → Live preview → Generate matching A4 PDF



The final result should allow me to create a new professional invoice in under a minute by entering only the client and project details.downloaded invoice should look like exactly the uploaded template, also make it responsive for mobile too and I should be able to add my details as default no need to modify every time

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/555bc87e-cdc8-4c91-b47d-2189e78ef9a2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
