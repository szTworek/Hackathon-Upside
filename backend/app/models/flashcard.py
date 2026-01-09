from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Flashcard(BaseModel):
    __tablename__ = "flashcards"

    question: Mapped[str] = mapped_column(Text, nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)
    section_topic_id: Mapped[int] = mapped_column(ForeignKey("section_topics.id"), nullable=False)

    # Relationships
    section_topic: Mapped["SectionTopic"] = relationship("SectionTopic", back_populates="flashcards")
