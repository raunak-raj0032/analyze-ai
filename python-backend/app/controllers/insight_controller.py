import json
import re
from fastapi import HTTPException
from app.services.providers.gemini_service import send_to_gemini
from app.utils.prompt_builder import build_multiple_insights_prompt
from pandas import DataFrame

def generate_insights_from_df(df: DataFrame):
    try:
        # Convert DataFrame to string for LLM
        data_str = df.to_string(index=False)

        # Build prompt
        prompt = build_multiple_insights_prompt(data_str)

        # Call Gemini
        raw_response = send_to_gemini(prompt)

        # Extract raw text
        text_response = raw_response["candidates"][0]["content"]["parts"][0]["text"]

        # Remove markdown code fences like ```json ... ```
        cleaned_text = re.sub(r"^```json\s*|\s*```$", "", text_response.strip(), flags=re.MULTILINE)

        # Parse JSON
        try:
            insights_json = json.loads(cleaned_text)
        except json.JSONDecodeError:
            insights_json = {"error": "Failed to parse JSON", "raw_text": cleaned_text}

        return {
            # "raw_response": raw_response,
            "insights": insights_json
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
