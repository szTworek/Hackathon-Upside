from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from vector_store import get_vector_store

load_dotenv()

def format_docs(docs):
    """Format retrieved documents into a single string"""
    return "\n\n".join(doc.page_content for doc in docs)

def get_conversation_chain():
    """Create a RAG chain using modern LangChain approach"""
    db = get_vector_store()
    
    if db is None:
        raise ValueError("Baza wektorowa nie istnieje! Uruchom najpierw update_db.py")
    
    retriever = db.as_retriever(search_kwargs={"k": 3})
    
    llm = ChatOpenAI(model="gpt-4.1", temperature=0)
    
    template = """Odpowiedz na pytanie na podstawie następującego kontekstu:

Kontekst: {context}

Pytanie: {question}

Odpowiedź:"""
    
    prompt = ChatPromptTemplate.from_template(template)
    
    chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough()
        }
        | prompt
        | llm
        | StrOutputParser()
    )
    
    return chain

def ask_question(question: str) -> str:
    """Ask a question and get an answer from the RAG system"""
    chain = get_conversation_chain()
    return chain.invoke(question)

def interactive_mode():
    """Run interactive Q&A session"""
    print("🤖 Tryb interaktywny RAG")
    print("Wpisz 'exit' lub 'quit' aby zakończyć\n")
    
    while True:
        question = input("❓ Pytanie: ")
        
        if question.lower() in ['exit', 'quit', 'q']:
            print("👋 Do widzenia!")
            break
            
        if not question.strip():
            continue
        
        print("\n🔍 Szukam odpowiedzi...\n")
        answer = ask_question(question)
        print(f"💡 Odpowiedź: {answer}\n")
        print("-" * 80 + "\n")

if __name__ == "__main__":
    interactive_mode()