// Mock data dla kart (talii fiszek)
export const decks = [
  { id: "1", title: "Angielski B2", icon: "Languages" },
  { id: "2", title: "Matematyka", icon: "Calculator" },
  { id: "3", title: "Historia", icon: "BookOpen" },
  { id: "4", title: "Programowanie", icon: "Code" },
  { id: "5", title: "Chemia", icon: "Atom" },
];

// Mock data dla materialow przypisanych do kart
export const materials = {
  "1": [
    { id: "m1", name: "vocabulary.pdf", type: "pdf", status: "processed" },
    { id: "m2", name: "grammar_rules.txt", type: "txt", status: "not-processed" },
    { id: "m3", name: "irregular_verbs.png", type: "png", status: "processed" },
  ],
  "2": [
    { id: "m4", name: "formulas.pdf", type: "pdf", status: "processed" },
    { id: "m5", name: "exercises.txt", type: "txt", status: "failed" },
  ],
  "3": [
    { id: "m6", name: "timeline.jpg", type: "jpg", status: "not-processed" },
    { id: "m7", name: "notes.pdf", type: "pdf", status: "not-processed" },
  ],
  "4": [
    { id: "m8", name: "algorithms.pdf", type: "pdf", status: "processed" },
  ],
  "5": [],
};

// Stan sekcji materialow dla kazdej karty
export const deckProcessingStatus = {
  "1": "idle",
  "2": "processing",
  "3": "idle",
  "4": "idle",
  "5": "idle",
};

// Helper do pobierania karty po ID
export function getDeckById(id) {
  return decks.find((deck) => deck.id === id);
}

// Helper do pobierania materialow karty
export function getMaterialsByDeckId(id) {
  return materials[id] || [];
}

// Helper do pobierania statusu sekcji
export function getDeckProcessingStatus(id) {
  return deckProcessingStatus[id] || "idle";
}

// Mock data dla tematow w taliach
export const topics = {
  "1": [
    { id: "t1", title: "Słownictwo - Podróże", icon: "Globe" },
    { id: "t2", title: "Czasowniki nieregularne", icon: "BookOpen" },
    { id: "t3", title: "Idiomy i zwroty", icon: "Languages" },
  ],
  "2": [
    { id: "t4", title: "Równania kwadratowe", icon: "Calculator" },
    { id: "t5", title: "Trygonometria", icon: "Calculator" },
    { id: "t6", title: "Geometria analityczna", icon: "Calculator" },
  ],
  "3": [
    { id: "t7", title: "II Wojna Światowa", icon: "Globe" },
    { id: "t8", title: "Starożytny Rzym", icon: "BookOpen" },
  ],
  "4": [
    { id: "t9", title: "Algorytmy sortowania", icon: "Code" },
    { id: "t10", title: "Struktury danych", icon: "Code" },
    { id: "t11", title: "Wzorce projektowe", icon: "Brain" },
  ],
  "5": [
    { id: "t12", title: "Układ okresowy", icon: "Atom" },
    { id: "t13", title: "Reakcje chemiczne", icon: "Atom" },
  ],
};

// Mock data dla fiszek w tematach
export const flashcards = {
  "t1": [
    { id: "f1", question: "Jak po angielsku 'lotnisko'?", answer: "Airport" },
    { id: "f2", question: "Jak po angielsku 'bagaż'?", answer: "Luggage / Baggage" },
    { id: "f3", question: "Jak po angielsku 'odprawa'?", answer: "Check-in" },
    { id: "f4", question: "Jak po angielsku 'lot'?", answer: "Flight" },
  ],
  "t2": [
    { id: "f5", question: "Past tense of 'go'?", answer: "Went" },
    { id: "f6", question: "Past tense of 'buy'?", answer: "Bought" },
    { id: "f7", question: "Past tense of 'think'?", answer: "Thought" },
    { id: "f8", question: "Past tense of 'teach'?", answer: "Taught" },
  ],
  "t3": [
    { id: "f9", question: "Co znaczy 'break a leg'?", answer: "Powodzenia!" },
    { id: "f10", question: "Co znaczy 'piece of cake'?", answer: "Bułka z masłem (coś łatwego)" },
  ],
  "t4": [
    { id: "f11", question: "Wzór na deltę?", answer: "Δ = b² - 4ac" },
    { id: "f12", question: "Wzór na x gdy Δ > 0?", answer: "x = (-b ± √Δ) / 2a" },
    { id: "f13", question: "Ile rozwiązań ma równanie gdy Δ < 0?", answer: "Brak rozwiązań rzeczywistych" },
  ],
  "t5": [
    { id: "f14", question: "sin(30°) = ?", answer: "1/2" },
    { id: "f15", question: "cos(60°) = ?", answer: "1/2" },
    { id: "f16", question: "tg(45°) = ?", answer: "1" },
  ],
  "t6": [
    { id: "f17", question: "Wzór na odległość między dwoma punktami?", answer: "d = √[(x₂-x₁)² + (y₂-y₁)²]" },
    { id: "f18", question: "Równanie prostej w postaci kierunkowej?", answer: "y = ax + b" },
  ],
  "t7": [
    { id: "f19", question: "Kiedy rozpoczęła się II Wojna Światowa?", answer: "1 września 1939" },
    { id: "f20", question: "Kiedy zakończyła się II Wojna Światowa w Europie?", answer: "8 maja 1945" },
    { id: "f21", question: "Co to był plan Barbarossa?", answer: "Niemiecka inwazja na ZSRR" },
  ],
  "t8": [
    { id: "f22", question: "Kiedy upadło Cesarstwo Rzymskie na Zachodzie?", answer: "476 n.e." },
    { id: "f23", question: "Kto był pierwszym cesarzem rzymskim?", answer: "Oktawian August" },
  ],
  "t9": [
    { id: "f24", question: "Złożoność czasowa QuickSort (średnia)?", answer: "O(n log n)" },
    { id: "f25", question: "Złożoność czasowa Bubble Sort?", answer: "O(n²)" },
    { id: "f26", question: "Który algorytm sortowania jest stabilny: QuickSort czy MergeSort?", answer: "MergeSort" },
  ],
  "t10": [
    { id: "f27", question: "Złożoność wyszukiwania w tablicy haszującej?", answer: "O(1) średnio" },
    { id: "f28", question: "Co to jest stos (stack)?", answer: "Struktura LIFO (Last In, First Out)" },
    { id: "f29", question: "Co to jest kolejka (queue)?", answer: "Struktura FIFO (First In, First Out)" },
  ],
  "t11": [
    { id: "f30", question: "Co to jest wzorzec Singleton?", answer: "Wzorzec gwarantujący tylko jedną instancję klasy" },
    { id: "f31", question: "Co to jest wzorzec Observer?", answer: "Wzorzec powiadamiania obiektów o zmianach stanu" },
  ],
  "t12": [
    { id: "f32", question: "Symbol chemiczny złota?", answer: "Au" },
    { id: "f33", question: "Symbol chemiczny żelaza?", answer: "Fe" },
    { id: "f34", question: "Ile elektronów ma wodór?", answer: "1" },
  ],
  "t13": [
    { id: "f35", question: "Co to jest reakcja egzotermiczna?", answer: "Reakcja wydzielająca ciepło" },
    { id: "f36", question: "Co to jest reakcja endotermiczna?", answer: "Reakcja pochłaniająca ciepło" },
  ],
};

// Helper do pobierania tematow talii
export function getTopicsByDeckId(deckId) {
  return topics[deckId] || [];
}

// Helper do pobierania tematu po ID
export function getTopicById(topicId) {
  for (const deckTopics of Object.values(topics)) {
    const topic = deckTopics.find((t) => t.id === topicId);
    if (topic) return topic;
  }
  return null;
}

// Helper do pobierania fiszek tematu
export function getFlashcardsByTopicId(topicId) {
  return flashcards[topicId] || [];
}

// Helper do pobierania fiszek z wielu tematow
export function getFlashcardsByTopicIds(topicIds) {
  return topicIds.flatMap((id) => flashcards[id] || []);
}
