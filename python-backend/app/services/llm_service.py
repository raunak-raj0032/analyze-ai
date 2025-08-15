from app.services.providers import gemini_client, ollama_client, openai_client
from app.utils.response_parser import get_llm_text, clean_and_parse_json

def send_to_llm(model: str, prompt: str):
    """
    Send prompt to selected LLM provider and return parsed JSON if possible.
    """
    if model == "gemini":
        raw_result = gemini_client.send_prompt(prompt)
    elif model == "ollama":
        raw_result = ollama_client.send_prompt(prompt)
    elif model == "openai":
        raw_result = openai_client.send_prompt(prompt)
    else:
        raise ValueError(f"Unknown model: {model}")

    # Extract text
    raw_text = get_llm_text(raw_result)

    # Try parsing JSON
    try:
        return clean_and_parse_json(raw_text)
    except Exception:
        return {"raw_text": raw_text}  # Fallback if parsing fails
