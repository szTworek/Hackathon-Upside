import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv

load_dotenv()

# Module-level variable
DB_PATH = os.getenv("VECTOR_STORE_PATH")
print(f"Using vector store path: {DB_PATH}")

def update_path():
    global DB_PATH
    DB_PATH = os.getenv("VECTOR_STORE_PATH")
    print(f"Using vector store path: {DB_PATH}")

def get_embeddings():
    """Create embeddings instance with the newer model"""
    return OpenAIEmbeddings(model="text-embedding-3-large")

def get_vector_store():
    """Get or create a FAISS vector store"""
    try:
        embeddings = get_embeddings()
    except Exception as e:
        print(f"⚠️  Error creating embeddings: {e}")
        return None

    if os.path.exists(DB_PATH) and os.path.isdir(DB_PATH):
        try:
            index_file = os.path.join(DB_PATH, "index.faiss")
            if os.path.exists(index_file):
                return FAISS.load_local(
                    DB_PATH, 
                    embeddings, 
                    allow_dangerous_deserialization=True
                )
            else:
                print(f"⚠️  Directory {DB_PATH} exists but index.faiss is missing")
                return None
        except Exception as e:
            print(f"⚠️  Error loading vector store: {e}")
            return None

    return None

def save_vector_store(db):
    """Save FAISS vector store to disk"""
    os.makedirs(DB_PATH, exist_ok=True)
    db.save_local(DB_PATH)
