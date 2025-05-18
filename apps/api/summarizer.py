import nltk
nltk.data.path.append("./nltk_data")

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from typing import Literal
import torch

# Initialize BART model and tokenizer with CPU optimization
tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
model = AutoModelForSeq2SeqLM.from_pretrained(
    "facebook/bart-large-cnn",
    device_map="cpu",
    torch_dtype=torch.float32
)

def summarize_text_file(text: str, num_sentences: int = 3, method: Literal["bart", "lsa"] = "bart") -> str:
    try:
        # BART summarization
        inputs = tokenizer(text, max_length=1024, truncation=True, return_tensors="pt")
        summary_ids = model.generate(
            inputs["input_ids"],
        )
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary if summary else "Summary could not be generated."
    except Exception as e:
        print(f"Summarization error: {e}")
        raise
