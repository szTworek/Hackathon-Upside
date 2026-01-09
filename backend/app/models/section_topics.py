from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class SectionTopic(BaseModel):
    __tablename__ = "section_topics"

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    study_section_id: Mapped[int] = mapped_column(ForeignKey("study_sections.id"), nullable=False)

    # Relationships
    study_section: Mapped["StudySection"] = relationship("StudySection", back_populates="section_topics")
    flashcards: Mapped[list["Flashcard"]] = relationship(
        "Flashcard", back_populates="section_topic", cascade="all, delete-orphan"
    )
