from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import StudySectionSettings

router = APIRouter(prefix="/study-section-settings", tags=["study-section-settings"])


@router.get("/")
def get_all_settings(db: Session = Depends(get_db)):
    return db.query(StudySectionSettings).filter(StudySectionSettings.is_deleted == False).all()


@router.get("/{settings_id}")
def get_settings(settings_id: int, db: Session = Depends(get_db)):
    settings = db.query(StudySectionSettings).filter(
        StudySectionSettings.id == settings_id,
        StudySectionSettings.is_deleted == False
    ).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings


@router.get("/by-study-section/{study_section_id}")
def get_settings_by_study_section(study_section_id: int, db: Session = Depends(get_db)):
    settings = db.query(StudySectionSettings).filter(
        StudySectionSettings.study_section_id == study_section_id,
        StudySectionSettings.is_deleted == False
    ).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found for this study section")
    return settings
