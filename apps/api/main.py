import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from summarizer import summarize_text_file
import logging

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/summarize")
async def summarize(file: UploadFile = File(...)):
    if not (file.filename.endswith(".txt") or file.filename.endswith(".pdf")):
        logger.warning(f"Rejected file: {file.filename}")
        raise HTTPException(status_code=400, detail="Only .txt and .pdf files are supported.")
    try:
        content = await file.read()
        is_pdf = file.filename.endswith(".pdf")
        if not is_pdf:
            content = content.decode("utf-8")
    except Exception as e:
        logger.error(f"Error reading file: {e}")
        raise HTTPException(status_code=500, detail="Failed to read file.")
    try:
        summary = summarize_text_file(content, is_pdf=is_pdf)
    except Exception as e:
        logger.error(f"Error generating summary: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate summary.")
    logger.info(f"Summary generated for file: {file.filename}")
    return {"summary": summary}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)