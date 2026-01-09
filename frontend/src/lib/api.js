const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Domyslne ikony dla deckow i topicow
const DEFAULT_DECK_ICONS = ["BookOpen", "Languages", "Calculator", "Code", "Brain", "Atom", "Globe"];
const DEFAULT_TOPIC_ICONS = ["BookOpen", "Code", "Calculator", "Globe", "Brain", "Languages", "Atom"];

function getDefaultIcon(id, icons) {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return icons[(numericId - 1) % icons.length];
}

// ==================== DECKS (StudySections) ====================

export async function getDecks() {
  const sections = await fetchApi("/study-sections");
  return sections.map((section) => ({
    id: String(section.id),
    title: section.title,
    icon: getDefaultIcon(section.id, DEFAULT_DECK_ICONS),
    status: section.status,
  }));
}

export async function getDeck(id) {
  const section = await fetchApi(`/study-sections/${id}`);
  return {
    id: String(section.id),
    title: section.title,
    icon: getDefaultIcon(section.id, DEFAULT_DECK_ICONS),
    status: section.status,
  };
}

export async function createDeck(title) {
  const section = await fetchApi("/study-sections", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  return {
    id: String(section.id),
    title: section.title,
    icon: getDefaultIcon(section.id, DEFAULT_DECK_ICONS),
    status: section.status,
  };
}

// ==================== MATERIALS (UploadedFiles) ====================

export async function getMaterials(studySectionId) {
  const files = await fetchApi(`/uploaded-files?study_section_id=${studySectionId}`);
  return files.map((file) => ({
    id: String(file.id),
    name: file.filename,
    type: file.file_format,
    status: "processed", // backend nie ma statusu plikow, domyslnie processed
  }));
}

// ==================== TOPICS (SectionTopics) ====================

export async function getTopics(studySectionId) {
  const topics = await fetchApi(`/section-topics?study_section_id=${studySectionId}`);
  return topics.map((topic) => ({
    id: String(topic.id),
    title: topic.title,
    icon: getDefaultIcon(topic.id, DEFAULT_TOPIC_ICONS),
  }));
}

export async function getTopic(topicId) {
  const topic = await fetchApi(`/section-topics/${topicId}`);
  return {
    id: String(topic.id),
    title: topic.title,
    icon: getDefaultIcon(topic.id, DEFAULT_TOPIC_ICONS),
  };
}

// ==================== FLASHCARDS ====================

export async function getFlashcards(topicId) {
  const flashcards = await fetchApi(`/flashcards?section_topic_id=${topicId}`);
  return flashcards.map((fc) => ({
    id: String(fc.id),
    question: fc.question,
    answer: fc.answer,
  }));
}

export async function getFlashcardsByTopicIds(topicIds) {
  if (!topicIds || topicIds.length === 0) {
    return [];
  }
  const idsParam = topicIds.join(",");
  const flashcards = await fetchApi(`/flashcards?section_topic_ids=${idsParam}`);
  return flashcards.map((fc) => ({
    id: String(fc.id),
    question: fc.question,
    answer: fc.answer,
  }));
}

// ==================== PROCESSING STATUS ====================

export function getDeckProcessingStatus(status) {
  // Mapowanie statusu z backendu na frontend
  if (status === "processing") return "processing";
  return "idle";
}
