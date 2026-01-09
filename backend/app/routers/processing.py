from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import StudySection, UploadedFile

router = APIRouter(prefix="/processing", tags=["processing"])


@router.post("/process-section")
async def process_section(
    title: str = Form(...),
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    study_section = StudySection(title=title)
    db.add(study_section)
    db.flush()

    uploaded_files = []
    for file in files:
        content = await file.read()
        uploaded_file = UploadedFile(
            filename=file.filename,
            file_format=file.content_type or "unknown",
            file_size=len(content),
            study_section_id=study_section.id
        )
        db.add(uploaded_file)
        uploaded_files.append(uploaded_file)

    db.commit()
    db.refresh(study_section)

    return {
        "study_section_id": study_section.id,
        "title": study_section.title,
        "files_count": len(uploaded_files)
    }
