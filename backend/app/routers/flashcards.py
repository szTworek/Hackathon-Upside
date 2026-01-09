from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Flashcard

router = APIRouter(prefix="/flashcards", tags=["flashcards"])


@router.get("/")
def get_flashcards(
    section_topic_id: int | None = Query(None),
    section_topic_ids: str | None = Query(None, description="Comma-separated list of topic IDs"),
    db: Session = Depends(get_db)
):
    query = db.query(Flashcard).filter(Flashcard.is_deleted == False)
    if section_topic_ids:
        ids = [int(id.strip()) for id in section_topic_ids.split(",") if id.strip()]
        query = query.filter(Flashcard.section_topic_id.in_(ids))
    elif section_topic_id:
        query = query.filter(Flashcard.section_topic_id == section_topic_id)
    return query.all()


@router.get("/{flashcard_id}")
def get_flashcard(flashcard_id: int, db: Session = Depends(get_db)):
    flashcard = db.query(Flashcard).filter(
        Flashcard.id == flashcard_id,
        Flashcard.is_deleted == False
    ).first()
    if not flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return flashcard
