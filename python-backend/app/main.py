# app/main.py
from fastapi import FastAPI

try:
    # When run with `uvicorn app.main:app`
    from app.routes import insight_routes
except ImportError:
    # When run with `python app/main.py`
    from routes import insight_routes

app = FastAPI()

app.include_router(insight_routes.router)

@app.get("/")
def root():
    return {"message": "API is running"}

# Allow running directly: python app/main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)
