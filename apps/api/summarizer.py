from typing import Union, Literal
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from PyPDF2 import PdfReader
from io import BytesIO
import torch

# ---------------------------
# Model & Tokenizer Setup
# ---------------------------
tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = AutoModelForSeq2SeqLM.from_pretrained(
    "facebook/bart-large-cnn",
    torch_dtype=torch.float32
).to(device)


# ---------------------------
# PDF Text Extraction
# ---------------------------
def extract_text_from_pdf(pdf_file: bytes) -> str:
    try:
        pdf = PdfReader(BytesIO(pdf_file))
        text = ""
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        if not text.strip():
            raise ValueError("No text found in PDF. It may be image-based.")
        return text
    except Exception as e:
        print(f"PDF extraction error: {e}")
        raise


# ---------------------------
# Text Chunking (for long input)
# ---------------------------
def chunk_text(text: str, max_words: int = 600) -> list:
    words = text.split()
    return [" ".join(words[i:i + max_words]) for i in range(0, len(words), max_words)]


# ---------------------------
# BART Summarization
# ---------------------------
def summarize_with_bart(text: str) -> str:
    try:
        chunks = chunk_text(text)
        all_summaries = []

        for chunk in chunks:
            inputs = tokenizer(chunk, max_length=1024, truncation=True, return_tensors="pt")
            inputs = {k: v.to(device) for k, v in inputs.items()}

            summary_ids = model.generate(
                inputs["input_ids"],
                max_length=610,
                min_length=150,
                length_penalty=2.0,
                num_beams=4,
                early_stopping=False,
                repetition_penalty=1.2,
                no_repeat_ngram_size=3
            )
            summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
            all_summaries.append(summary)

        return "\n\n".join(all_summaries)
    except Exception as e:
        print(f"Summarization error: {e}")
        raise


# ---------------------------
# Unified Summarize Function (.txt or .pdf)
# ---------------------------
def summarize_file(content: Union[str, bytes], is_pdf: bool = False, method: Literal["bart"] = "bart") -> str:
    try:
        if is_pdf:
            text = extract_text_from_pdf(content)
        else:
            text = content if isinstance(content, str) else content.decode("utf-8")

        if method == "bart":
            return summarize_with_bart(text)
        else:
            raise ValueError(f"Unsupported summarization method: {method}")
    except Exception as e:
        print(f"Failed to summarize: {e}")
        raise
