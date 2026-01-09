from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import StudySection


class CreateStudySectionRequest(BaseModel):
    title: str


router = APIRouter(prefix="/study-sections", tags=["study-sections"])


@router.get("/")
def get_study_sections(db: Session = Depends(get_db)):
    return db.query(StudySection).filter(StudySection.is_deleted == False).all()


@router.get("/{study_section_id}")
def get_study_section(study_section_id: int, db: Session = Depends(get_db)):
    study_section = db.query(StudySection).filter(
        StudySection.id == study_section_id,
        StudySection.is_deleted == False
    ).first()
    if not study_section:
        raise HTTPException(status_code=404, detail="Study section not found")
    return study_section


@router.post("/")
def create_study_section(request: CreateStudySectionRequest, db: Session = Depends(get_db)):
    study_section = StudySection(title=request.title)
    db.add(study_section)
    db.commit()
    db.refresh(study_section)
    return study_section
