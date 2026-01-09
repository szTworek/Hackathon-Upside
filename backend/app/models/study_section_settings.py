from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class StudySectionSettings(BaseModel):
    __tablename__ = "study_section_settings"

    study_section_id: Mapped[int] = mapped_column(
        ForeignKey("study_sections.id"), unique=True, nullable=False
    )

    # Relationships (one-to-one)
    study_section: Mapped["StudySection"] = relationship("StudySection", back_populates="settings")
