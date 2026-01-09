from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class ProcessedSection(BaseModel):
    __tablename__ = "processed_sections"

    content: Mapped[str] = mapped_column(Text, nullable=False)
    study_section_id: Mapped[int] = mapped_column(ForeignKey("study_sections.id"), nullable=False)

    # Relationships
    study_section: Mapped["StudySection"] = relationship("StudySection", back_populates="processed_sections")
