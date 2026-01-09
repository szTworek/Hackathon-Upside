from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import UploadedFile

router = APIRouter(prefix="/uploaded-files", tags=["uploaded-files"])


@router.get("/")
def get_uploaded_files(
    study_section_id: int | None = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(UploadedFile).filter(UploadedFile.is_deleted == False)
    if study_section_id:
        query = query.filter(UploadedFile.study_section_id == study_section_id)
    return query.all()


@router.get("/{file_id}")
def get_uploaded_file(file_id: int, db: Session = Depends(get_db)):
    uploaded_file = db.query(UploadedFile).filter(
        UploadedFile.id == file_id,
        UploadedFile.is_deleted == False
    ).first()
    if not uploaded_file:
        raise HTTPException(status_code=404, detail="Uploaded file not found")
    return uploaded_file
