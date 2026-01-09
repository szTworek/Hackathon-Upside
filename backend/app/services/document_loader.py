def load_txt(file_path: str) -> str:
    """Load text from a .txt file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()