# PDF Setup Instructions for Terms & Conditions

## Current Status
You have two Word documents (.docx) in the root directory:
- `Business_terms_conditions.docx` - Business registration terms
- `Personal_terms_conditions.docx` - Personal registration terms

## Required Steps

### Step 1: Convert DOCX to PDF
You need to convert both Word documents to PDF format. You can do this using:

**Option A: Microsoft Word (Recommended)**
1. Open `Business_terms_conditions.docx` in Microsoft Word
2. Click "File" → "Save As" or "Export"
3. Choose "PDF" as the file format
4. Save as `Business_terms_conditions.pdf`
5. Repeat for `Personal_terms_conditions.docx` → `Personal_terms_conditions.pdf`

**Option B: Online Converter**
1. Go to a free online converter like:
   - https://smallpdf.com/word-to-pdf
   - https://www.ilovepdf.com/word_to_pdf
2. Upload your .docx files
3. Download the converted PDF files

**Option C: Google Docs**
1. Upload the .docx files to Google Drive
2. Open with Google Docs
3. File → Download → PDF Document (.pdf)

### Step 2: Add PDF Files to Public Folder

Create a `public` folder in the frontend directory and add the PDF files:

```
frontend/
├── public/
│   ├── Business_terms_conditions.pdf
│   └── Personal_terms_conditions.pdf
├── src/
├── index.html
└── package.json
```

**Steps:**
1. Navigate to: `c:\Users\vaibh\Desktop\Clean-cars-360-main\frontend\`
2. Create a new folder named `public`
3. Copy both PDF files into the `public` folder
4. The files should be accessible at:
   - `/Business_terms_conditions.pdf`
   - `/Personal_terms_conditions.pdf`

### Step 3: Test the PDF Viewing

After adding the PDF files:

1. Start your development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Test the terms pages:
   - Personal: http://localhost:5173/terms/personal
   - Business: http://localhost:5173/terms/business

3. Verify:
   - ✅ PDF displays in the embedded viewer
   - ✅ Language toggle (English/Arabic) works
   - ✅ Download button works
   - ✅ Full screen button works

## Features Implemented

The updated Terms & Conditions page now includes:

1. **Embedded PDF Viewer** - Users can view the PDF directly on the page
2. **Language Toggle** - Switch between English and Arabic interface
3. **Download Option** - Download the PDF for offline reading
4. **Full Screen Option** - Open PDF in a new tab for better viewing
5. **Responsive Design** - Works on mobile and desktop

## Alternative: Host PDFs Online

If you prefer to host the PDFs online (recommended for production):

1. Upload PDFs to your cloud storage (Google Drive, Dropbox, AWS S3, etc.)
2. Get the direct download/view links
3. Update the `onlinePdfUrl` in `TermsAndConditions.tsx`:

```typescript
const onlinePdfUrl = isBusiness
  ? 'YOUR_BUSINESS_PDF_URL_HERE'
  : 'YOUR_PERSONAL_PDF_URL_HERE';
```

## Notes

- The PDF files should be in **English only** (the current DOCX files are already in English)
- The language toggle changes the **interface language**, not the PDF content
- If you need Arabic versions of the PDFs, you'll need to translate the documents separately
- For best viewing experience, ensure PDFs are optimized for web (not too large file size)

## Troubleshooting

**PDF not showing?**
- Check if the PDF files are in the correct location (`frontend/public/`)
- Verify the file names match exactly (case-sensitive)
- Try clearing browser cache

**PDF shows but doesn't download?**
- Check browser download settings
- Try opening in incognito mode
- Verify CORS settings if hosting online

**Need help?**
- Check the browser console for errors (F12 → Console)
- Verify the iframe src URL is correct
