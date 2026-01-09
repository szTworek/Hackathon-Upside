from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import processing, study_sections, study_section_settings, section_topics, flashcards, uploaded_files

app = FastAPI(title="Hackathon API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(processing.router)
app.include_router(study_sections.router)
app.include_router(study_section_settings.router)
app.include_router(section_topics.router)
app.include_router(flashcards.router)
app.include_router(uploaded_files.router)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
