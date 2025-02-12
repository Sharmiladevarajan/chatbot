import PyPDF2,os
from docx import Document
from langchain_openai.chat_models import ChatOpenAI
import dotenv
dotenv.load_dotenv()
def extract_text_from_pdf(file_path):
    """
    Extracts text from a PDF file using PyPDF2.
    """
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text


def extract_text_from_docx(file_path):
    doc = Document(file_path)
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    return '\n'.join(text)


def get_llm():
    return ChatOpenAI(
        temperature=0,
            model="gpt-4o-mini",
           api_key=os.getenv("key")  ,    )