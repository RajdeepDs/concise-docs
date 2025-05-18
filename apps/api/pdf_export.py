import os
from fastapi import APIRouter, Response, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from io import BytesIO
import datetime

router = APIRouter()

class ExportRequest(BaseModel):
    summary: str
    title: str = "Document Summary"

@router.post("/export-pdf")
async def export_to_pdf(export_data: ExportRequest):
    try:
        # Create a file-like buffer to receive PDF data
        buffer = BytesIO()
        
        # Create the PDF document using ReportLab
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=72,
            title=export_data.title,
            author="Concise Docs",
            subject="Document Summary",
            creator="Concise Docs PDF Export"
        )
        
        # Define styles
        styles = getSampleStyleSheet()
        
        # Modify the existing Title style instead of adding a new one
        styles["Title"].fontSize = 16
        styles["Title"].spaceAfter = 12
        styles["Title"].textColor = colors.darkblue
        
        # Add a custom style for summary paragraphs
        styles.add(
            ParagraphStyle(
                name='SummaryParagraph',
                parent=styles['Normal'],
                fontSize=11,
                leading=14,
                spaceBefore=6,
                spaceAfter=6
            )
        )
        
        # Container for PDF elements
        elements = []
        
        # Add title
        elements.append(Paragraph(export_data.title, styles["Title"]))
        elements.append(Spacer(1, 0.25*inch))
        
        # Add timestamp
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        elements.append(Paragraph(f"Generated on: {current_time}", styles["Italic"]))
        elements.append(Spacer(1, 0.25*inch))
        
        # Process the summary content - split by paragraphs
        paragraphs = export_data.summary.split('\n\n')
        for paragraph in paragraphs:
            if paragraph.strip():
                elements.append(Paragraph(paragraph, styles["SummaryParagraph"]))
                elements.append(Spacer(1, 0.1*inch))
                
        # Build PDF document
        doc.build(elements)
        
        # Get the value from the buffer
        pdf_value = buffer.getvalue()
        buffer.close()
        
        # Create response with PDF content
        filename = f"summary_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        response = Response(
            content=pdf_value, 
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
        return response
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error generating PDF: {e}")
        print(f"Error details: {error_details}")
        return JSONResponse(
            status_code=500,
            content={"error": f"Failed to generate PDF: {str(e)}"}
        )
