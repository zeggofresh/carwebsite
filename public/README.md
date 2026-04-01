# Public Folder for Static Assets

## Required PDF Files

You need to add the following PDF files to this folder:

1. `Business_terms_conditions.pdf` - Business registration terms (convert from .docx)
2. `Personal_terms_conditions.pdf` - Personal registration terms (convert from .docx)

## How to Add These Files

### Quick Steps:
1. Convert the .docx files to PDF (see instructions above)
2. Copy the PDF files into this `public` folder
3. That's it! The app will automatically serve them

### Detailed Conversion Instructions:

**Using Microsoft Word:**
```
1. Open "Business_terms_conditions.docx" 
2. File → Save As → Choose PDF format
3. Save as "Business_terms_conditions.pdf"
4. Repeat for "Personal_terms_conditions.docx"
5. Copy both PDFs to: frontend/public/
```

**Using Online Converter:**
- Visit: https://smallpdf.com/word-to-pdf
- Upload your .docx files
- Download the converted PDFs
- Place them in this folder

## File Locations After Setup:

```
frontend/
├── public/
│   ├── Business_terms_conditions.pdf    ← Add this
│   └── Personal_terms_conditions.pdf    ← Add this
├── src/
└── ...
```

## Access URLs:

Once added, the PDFs will be accessible at:
- http://localhost:5173/Business_terms_conditions.pdf
- http://localhost:5173/Personal_terms_conditions.pdf

## Testing:

After adding the files, visit:
- http://localhost:5173/terms/personal
- http://localhost:5173/terms/business

You should see the PDF embedded in the page with English/Arabic language toggle!
