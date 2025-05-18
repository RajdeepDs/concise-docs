from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

def summarize_text_file(text: str, num_sentences: int = 3) -> str:
    try:
        parser = PlaintextParser.from_string(text, Tokenizer("english"))
        summarizer = LsaSummarizer()
        summary_sentences = summarizer(parser.document, num_sentences)

        summary = " ".join(str(sentence) for sentence in summary_sentences)
        return summary if summary else "Summary could not be generated."
    except Exception as e:
        print(f"Summarization error: {e}")
        raise
