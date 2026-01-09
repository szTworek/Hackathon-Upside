from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import SectionTopic

router = APIRouter(prefix="/section-topics", tags=["section-topics"])


@router.get("/")
def get_section_topics(
    study_section_id: int | None = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(SectionTopic).filter(SectionTopic.is_deleted == False)
    if study_section_id:
        query = query.filter(SectionTopic.study_section_id == study_section_id)
    return query.all()


@router.get("/{topic_id}")
def get_section_topic(topic_id: int, db: Session = Depends(get_db)):
    topic = db.query(SectionTopic).filter(
        SectionTopic.id == topic_id,
        SectionTopic.is_deleted == False
    ).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Section topic not found")
    return topic
