from dotenv import load_dotenv
from document_loader import load_txt
from chunk_splitter import split_into_chunks
from vector_store import get_vector_store, save_vector_store, get_embeddings, update_path
from langchain_community.vectorstores import FAISS

from file_preprocessor import FilePreprocessor

load_dotenv()

NOTE_PATH = "test_picture.png"
preprocessor = FilePreprocessor()

def update_db():
    """Load document, split into chunks, and add to vector store"""
    print(f"📖 Wczytuję dokument: {NOTE_PATH}")
    text = preprocessor.preprocess(NOTE_PATH)
    
    print("✂️  Dzielę tekst na chunki...")
    chunks = split_into_chunks(text)
    
    print(f"📊 Utworzono {len(chunks)} chunków")
    
    print("💾 Sprawdzam bazę wektorową...")
    update_path()
    db = get_vector_store()
    
    if db is None:
        print("🆕 Tworzę nową bazę wektorową...")
        embeddings = get_embeddings()
        db = FAISS.from_texts(chunks, embeddings)
        print("💿 Zapisuję nową bazę...")
    else:
        print("➕ Dodaję chunki do istniejącej bazy...")
        db.add_texts(chunks)
        print("💿 Aktualizuję bazę...")
    
    save_vector_store(db)
    
    print(f"✅ Pomyślnie dodano {len(chunks)} chunków do bazy")

if __name__ == "__main__":
    update_db()