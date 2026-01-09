from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from vector_store import get_vector_store

load_dotenv()

conversation_history = []

def format_docs(docs):
    """Format retrieved documents into a single string"""
    return "\n\n".join(doc.page_content for doc in docs)

def get_conversation_chain(flashcard: str | None = None):
    """Create a RAG chain with optional flashcard and conversation history"""
    db = get_vector_store()
    
    if db is None:
        raise ValueError("Baza wektorowa nie istnieje! Uruchom najpierw update_db.py")
    
    retriever = db.as_retriever(search_kwargs={"k": 3})
    llm = ChatOpenAI(model="gpt-4.1", temperature=0)

    def build_context(inputs):
        context = inputs["context"]
        question = inputs["question"]
        
        history_text = "\n".join(f"Pytanie: {q}\nOdpowiedź: {a}" for q, a in conversation_history)
        flashcard_text = f"\nFiszka: {flashcard}" if flashcard else ""
        
        full_context = ""
        if history_text:
            full_context += f"Historia:\n{history_text}\n\n"
        full_context += f"Kontekst:\n{context}{flashcard_text}\n\nPytanie: {question}"
        
        return full_context

    template = ChatPromptTemplate.from_template("{full_context}\n\nOdpowiedź:")
    
    # Fixed chain - use RunnablePassthrough.assign()
    chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough()
        }
        | RunnablePassthrough.assign(full_context=build_context)
        | template
        | llm
        | StrOutputParser()
    )
    
    return chain

def ask_question(question: str, flashcard: str | None = None) -> str:
    """Ask a question and get an answer from the RAG system"""
    chain = get_conversation_chain(flashcard)
    answer = chain.invoke(question)
    
    conversation_history.append((question, answer))
    return answer

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
        
        flashcard = input("💾 Fiszka (opcjonalnie, enter aby pominąć): ").strip() or None
        
        print("\n🔍 Szukam odpowiedzi...\n")
        try:
            answer = ask_question(question, flashcard)
            print(f"💡 Odpowiedź: {answer}\n")
        except Exception as e:
            print(f"❌ Błąd: {e}\n")
        print("-" * 80 + "\n")

if __name__ == "__main__":
    interactive_mode()