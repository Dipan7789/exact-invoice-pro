# Invoice Generator

## What I’ll build
- A polished invoice workspace with a dashboard, invoice history, and a fast “Create New Invoice” flow.
- A responsive editor: grouped form controls on the left and a live A4 preview on the right; stacked on smaller screens.
- Editable freelancer defaults, client details, invoice dates/status/currency, line items, tax, discount, advance paid, and payment details.
- Automatic totals, INR formatting, next invoice number suggestions, validation, and clear paid/balance states.
- Local invoice history with view, edit, duplicate, download, and delete actions.

## Reference fidelity
- Recreate the uploaded invoice’s pale mint rounded header, bold title and invoice number, billed-to/date alignment, sparse four-column services table, blue amount accents, total summary block, and lower payment section.
- Preserve the reference’s restrained spacing and one-page A4 proportions while allowing content to flow onto additional pages when needed.

## PDF output
- Generate a true A4 PDF with selectable text using the same layout rules as the preview.
- Wrap long text, align numeric columns, preserve margins, and add pages automatically for longer item lists.
- Validate required fields before saving or downloading.

## Technical details
- Keep data on the user’s device using browser storage, including the reusable default profile.
- Use a dedicated shared invoice data model and calculation utilities so preview, history, and PDF totals stay consistent.
- Add route-specific page metadata and verify the key create/save/download flow at desktop and mobile widths.
