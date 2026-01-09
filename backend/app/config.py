from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    postgres_user: str = "hackathon"
    postgres_password: str = "hackathon"
    postgres_db: str = "hackathon"
    postgres_host: str = "localhost"
    postgres_port: int = 5432
    secret_key: str = "dev-secret-key"
    database_url: Optional[str] = None

    def get_database_url(self) -> str:
        if self.database_url:
            return self.database_url
        return f"postgresql://{self.postgres_user}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"

    class Config:
        env_file = ".env"


settings = Settings()
