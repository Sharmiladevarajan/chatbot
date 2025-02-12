from flask import Flask,request,jsonify
from flask_cors import CORS
import PyPDF2



import os


def process_conversation():
    
    print(extract_text_from_pdf("uploads/Sharmila_resume.pdf"))


    

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extracts text from a PDF file using PyPDF2.
    """
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text


print(process_conversation())