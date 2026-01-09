import pdfplumber
import pytesseract
import base64

from openai import OpenAI
from pathlib import Path
from PIL import Image
from docx import Document

from dotenv import load_dotenv

class FilePreprocessor():
    def __init__(self):
        self.handlers = {
            ".txt": self.extract_text_from_txt,
            ".pdf": self.extract_text_from_pdf,
            ".png": self.extract_text_from_image,
            ".jpg": self.extract_text_from_image,
            ".docx": self.extract_text_from_docx,
        }
        self.client = OpenAI()

    def extract_text_from_txt(self, file_path: str) -> str:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    def extract_text_from_pdf(self, file_path: str) -> str:
        chunks = []
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    chunks.append(text)
        return "\n".join(chunks)    

    def extract_text_from_image(self, file_path: str) -> str:
        with open(file_path, "rb") as f:
            image_bytes = f.read()

        image_base64 = base64.b64encode(image_bytes).decode("utf-8")

        ext = Path(file_path).suffix.lower()
        mime = "image/png" if ext == ".png" else "image/jpeg"

        response = self.client.responses.create(
            model="gpt-4.1",
            input=[{
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": (
                            "Przepisz dokładnie cały tekst z obrazu. "
                            "Zachowaj akapity, polskie znaki, interpunkcję. "
                            "Nie streszczaj i nic nie dodawaj."
                        ),
                    },
                    {
                        "type": "input_image",
                        "image_url": f"data:{mime};base64,{image_base64}",
                    },
                ],
            }],
        )

        return response.output_text


    def extract_text_from_docx(self, file_path: str) -> str:
        document = Document(file_path)

        chunks = []
        for paragraph in document.paragraphs:
            text = paragraph.text.strip()
            if text:
                chunks.append(text)

        return "\n".join(chunks)

    def preprocess(self, file_path: str) -> str:
        ext = Path(file_path).suffix.lower()
        if ext not in self.handlers:
            raise ValueError(f"Unsupported file format: {ext}")

        return self.handlers[ext](file_path)