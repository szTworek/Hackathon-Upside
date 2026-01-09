import os
import json
from dotenv import load_dotenv
from openai import OpenAI

def generate_flashcards_pipeline(lecture_text):
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    # --- KROK 1: Strukturyzacja tekstu (z subtopics_pipeline.py) ---
    
    structuring_prompt = f"""
    Podziel poniższy tekst na logiczne PODTEMATY, a następnie pogrupuj je w nadrzędne GRUPY TEMATYCZNE.

    ZASADY (OBOWIĄZKOWE):
    - ABSOLUTNIE NIE ZMIENIAJ TEKSTU
    - NIE PARAFRAZUJ
    - NIE STRESZCZAJ
    - NIE DODAWAJ ANI NIE USUWAJ SŁÓW
    - Wszystkie opisy MUSZĄ być dosłownymi fragmentami tekstu źródłowego (copy-paste)
    - Twórz nowy PODTEMAT zawsze, gdy w tekście zmienia się temat
    - Następnie grupuj powstałe PODTEMATY w logiczne GRUPY TEMATYCZNE wyższego poziomu
    - Każda GRUPA TEMATYCZNA ma unikalny tytuł

    ZWRÓĆ WYŁĄCZNIE POPRAWNY JSON:
    [
      {{
        "group_title": "nazwa grupy tematycznej",
        "subtopics": [
          {{ "text": "DOKŁADNY FRAGMENT TEKSTU" }}
        ]
      }}
    ]

    TEKST:
    {lecture_text}
    """

    struct_response = client.chat.completions.create(
        model="gpt-4.1", # Pozostawiono zgodnie z oryginałem użytkownika
        messages=[
            {"role": "system", "content": "Jesteś narzędziem do strukturyzowania tekstu. Nie zmieniaj treści, tylko wskazuj granice podtematów."},
            {"role": "user", "content": structuring_prompt}
        ],
        temperature=0.2
    )

    # Parsowanie wyniku do listy obiektów Python
    groups = json.loads(struct_response.choices[0].message.content)

    # --- KROK 2: Generowanie fiszek (z flashcards.py) ---

    all_flashcards = []

    for group in groups:
        group_title = group.get("group_title", "Bez tytułu")
        print(f"Przetwarzanie grupy: {group_title}")

        current_group_list = [group_title]
        
        for subtopic in group.get("subtopics", []):
            content = subtopic.get("text", "")
            
            flashcard_prompt = f"""
            Na podstawie poniższego fragmentu tekstu stwórz jedną fiszkę do nauki.
            Fiszka musi składać się z pytania i odpowiedzi.

            ZASADY:
            - Odpowiedź musi być zwięzła i konkretna.
            - Format wyjściowy to wyłącznie: PYTANIE | ODPOWIEDŹ

            TEKST:
            {content}
            """

            card_response = client.chat.completions.create(
                model="gpt-4.1",
                messages=[
                    {"role": "system", "content": "Jesteś asystentem tworzącym pomocne fiszki edukacyjne. Zwracasz dane tylko w formacie: Pytanie | Odpowiedź."},
                    {"role": "user", "content": flashcard_prompt}
                ],
                temperature=0.7
            )

            result = card_response.choices[0].message.content.strip()
            
            if "|" in result:
                q, a = result.split("|", 1)
                current_group_list.append((q.strip(), a.strip()))
            else:
                current_group_list.append((result, "Brak odpowiedzi"))

        all_flashcards.append(current_group_list)

    return all_flashcards