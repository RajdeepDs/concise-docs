import nltk
nltk.data.path.append("./nltk_data")

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from typing import Literal, Union
import torch
from PyPDF2 import PdfReader
from io import BytesIO

# Initialize BART model and tokenizer with automatic device selection
tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = AutoModelForSeq2SeqLM.from_pretrained(
    "facebook/bart-large-cnn",
    torch_dtype=torch.float32
).to(device)

def extract_text_from_pdf(pdf_file: bytes) -> str:
    try:
        pdf = PdfReader(BytesIO(pdf_file))
        text = ""
        for page in pdf.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"PDF extraction error: {e}")
        raise

def summarize_text_file(content: Union[str, bytes], is_pdf: bool = False, num_sentences: int = 3, method: Literal["bart", "lsa"] = "bart") -> str:
    try:
        if is_pdf:
            text = extract_text_from_pdf(content)
        else:
            text = content

        # BART summarization
        inputs = tokenizer(text, max_length=1024, truncation=True, return_tensors="pt")
        inputs = {k: v.to(device) for k, v in inputs.items()}
        summary_ids = model.generate(
            inputs["input_ids"],
        )
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary if summary else "Summary could not be generated."
    except Exception as e:
        print(f"Summarization error: {e}")
        raise
