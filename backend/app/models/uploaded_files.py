from sqlalchemy import BigInteger, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class UploadedFile(BaseModel):
    __tablename__ = "uploaded_files"

    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    file_format: Mapped[str] = mapped_column(String(50), nullable=False)
    file_size: Mapped[int] = mapped_column(BigInteger, nullable=False)
    study_section_id: Mapped[int] = mapped_column(ForeignKey("study_sections.id"), nullable=False)

    # Relationships
    study_section: Mapped["StudySection"] = relationship("StudySection", back_populates="uploaded_files")
