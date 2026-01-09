import os
import json
from dotenv import load_dotenv
from openai import OpenAI

def generate_flashcards():
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    input_file = os.path.join(os.path.dirname(__file__), "..", "output", "subtopics.json")

    if not os.path.exists(input_file):
        print(f"Błąd: Nie znaleziono pliku {input_file}")
        exit()

    with open(input_file, "r", encoding="utf-8") as f:
        groups = json.load(f)

    flashcards = []

    for group in groups:
        group_title = group.get("group_title", "Bez tytułu")
        print(f"Przetwarzanie grupy: {group_title}")

        current_group_list = [group_title]
        
        for subtopic in group.get("subtopics", []):
            content = subtopic.get("text", "")
            
            prompt = f"""
            Na podstawie poniższego fragmentu tekstu stwórz jedną fiszkę do nauki.
            Fiszka musi składać się z pytania i odpowiedzi.

            ZASADY:
            - Odpowiedź musi być zwięzła i konkretna.
            - Format wyjściowy to wyłącznie: PYTANIE | ODPOWIEDŹ

            TEKST:
            {content}
            """

            response = client.chat.completions.create(
                model="gpt-4.1",
                messages=[
                    {"role": "system", "content": "Jesteś asystentem tworzącym pomocne fiszki edukacyjne. Zwracasz dane tylko w formacie: Pytanie | Odpowiedź."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5
            )

            result = response.choices[0].message.content.strip()
            
            if "|" in result:
                q, a = result.split("|", 1)
                current_group_list.append((q.strip(), a.strip()))
            else:
                current_group_list.append((result, "Brak odpowiedzi"))

            flashcards.append(current_group_list)

    return flashcards