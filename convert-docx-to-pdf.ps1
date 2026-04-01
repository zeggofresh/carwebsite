# Convert DOCX to PDF - Helper Script for Windows
# This script requires Microsoft Word to be installed

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "DOCX to PDF Converter" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = Split-Path -Parent $PSScriptRoot
$businessDocx = Join-Path $rootPath "Business_terms_conditions.docx"
$personalDocx = Join-Path $rootPath "Personal_terms_conditions.docx"
$publicFolder = Join-Path $PSScriptRoot "public"

# Ensure public folder exists
if (-not (Test-Path $publicFolder)) {
    Write-Host "Creating public folder..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $publicFolder | Out-Null
}

Write-Host "Converting documents to PDF..." -ForegroundColor Green
Write-Host ""

try {
    # Create Word COM object
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    
    # Convert Business terms
    if (Test-Path $businessDocx) {
        Write-Host "Converting Business Terms..." -ForegroundColor Cyan
        $doc = $word.Documents.Open($businessDocx)
        $pdfPath = Join-Path $publicFolder "Business_terms_conditions.pdf"
        $doc.SaveAs([ref]$pdfPath, [ref]17)  # 17 = wdFormatPDF
        $doc.Close()
        Write-Host "✓ Business_terms_conditions.pdf created" -ForegroundColor Green
    } else {
        Write-Host "✗ Business_terms_conditions.docx not found!" -ForegroundColor Red
    }
    
    # Convert Personal terms
    if (Test-Path $personalDocx) {
        Write-Host "Converting Personal Terms..." -ForegroundColor Cyan
        $doc = $word.Documents.Open($personalDocx)
        $pdfPath = Join-Path $publicFolder "Personal_terms_conditions.pdf"
        $doc.SaveAs([ref]$pdfPath, [ref]17)  # 17 = wdFormatPDF
        $doc.Close()
        Write-Host "✓ Personal_terms_conditions.pdf created" -ForegroundColor Green
    } else {
        Write-Host "✗ Personal_terms_conditions.docx not found!" -ForegroundColor Red
    }
    
    $word.Quit()
    
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "Conversion Complete!" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "PDF files are now in: frontend/public/" -ForegroundColor White
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Start the dev server: npm run dev" -ForegroundColor White
    Write-Host "2. Test at: http://localhost:5173/terms/personal" -ForegroundColor White
    Write-Host "3. Test at: http://localhost:5173/terms/business" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Error occurred during conversion!" -ForegroundColor Red
    Write-Host "Make sure Microsoft Word is installed on your system." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Alternative: Use online converter at https://smallpdf.com/word-to-pdf" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Error details: $_" -ForegroundColor Red
}
