from fastapi import APIRouter, UploadFile
import pandas as pd
from app.controllers.insight_controller import generate_insights_from_df

router = APIRouter(prefix="/insights", tags=["Insights"])

@router.post("/generate")
async def generate_insights(file: UploadFile):
    df = pd.read_csv(file.file)
    return generate_insights_from_df(df)
