import enum

from sqlalchemy import Enum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class StudySectionStatus(enum.Enum):
    PROCESSING = "processing"
    PROCESSED = "processed"
    FAILED = "failed"


class StudySection(BaseModel):
    __tablename__ = "study_sections"

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[StudySectionStatus] = mapped_column(
        Enum(StudySectionStatus), default=StudySectionStatus.PROCESSING, nullable=False
    )

    # Relationships
    processed_sections: Mapped[list["ProcessedSection"]] = relationship(
        "ProcessedSection", back_populates="study_section", cascade="all, delete-orphan"
    )
    settings: Mapped["StudySectionSettings"] = relationship(
        "StudySectionSettings", back_populates="study_section", uselist=False, cascade="all, delete-orphan"
    )
    uploaded_files: Mapped[list["UploadedFile"]] = relationship(
        "UploadedFile", back_populates="study_section", cascade="all, delete-orphan"
    )
    section_topics: Mapped[list["SectionTopic"]] = relationship(
        "SectionTopic", back_populates="study_section", cascade="all, delete-orphan"
    )
