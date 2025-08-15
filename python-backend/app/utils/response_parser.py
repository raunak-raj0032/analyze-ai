# utils/response_parser.py
import json
import re
def get_llm_text(result: dict) -> str:
    """
    Safely extracts the main text content from an LLM response,
    supporting both Gemini and Ollama formats.

    Args:
        result: The raw dictionary response from the send_to_llm service.

    Returns:
        The extracted text content as a string, or an empty string if not found.
    """
    if not isinstance(result, dict):
        return ""

    # 1. Try to parse the Gemini format: result['candidates'][0]['content']['parts'][0]['text']
    try:
        candidates = result.get("candidates")
        if candidates and isinstance(candidates, list) and len(candidates) > 0:
            content = candidates[0].get("content")
            if content and isinstance(content, dict):
                parts = content.get("parts")
                if parts and isinstance(parts, list) and len(parts) > 0:
                    return parts[0].get("text", "").strip()
    except (KeyError, IndexError, TypeError):
        # This structure is not present, so we'll try the next format
        pass

    # 2. Try to parse a generic/Ollama format: result['response']
    if "response" in result and isinstance(result["response"], str):
        return result["response"].strip()
        
    # 3. Fallback if no known format is found
    return ""



def clean_and_parse_json(raw_text: str) -> dict:
    """
    Cleans LLM output of markdown fences and extracts the first JSON object found.
    Ensures we can still parse even if the LLM adds extra text before/after.

    Args:
        raw_text: The string potentially wrapped in markdown or with extra text.

    Returns:
        dict: Parsed JSON object.

    Raises:
        ValueError: If no valid JSON object is found.
    """
    if not raw_text:
        raise ValueError("Cannot parse an empty string.")

    # 1. Remove markdown fences
    raw_text = raw_text.strip()
    if raw_text.startswith("```json"):
        raw_text = raw_text[7:].strip()
    elif raw_text.startswith("```"):
        raw_text = raw_text[3:].strip()
    if raw_text.endswith("```"):
        raw_text = raw_text[:-3].strip()

    # 2. Extract first {...} block
    match = re.search(r"\{.*\}", raw_text, re.DOTALL)
    if not match:
        raise ValueError("No JSON object found in text.")

    json_str = match.group(0).strip()

    # 3. Parse JSON
    return json.loads(json_str)

