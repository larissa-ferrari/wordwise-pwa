import logging
import traceback

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routers import auth, users, books, reviews, shelves, feed

logger = logging.getLogger(__name__)

app = FastAPI(
    title="WordWise API",
    version="1.0.0",
    description="Backend for the WordWise book social network",
)

# CORS must be registered before routers and exception handlers so that
# it wraps the entire app — including error responses.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Catch-all handler: makes unhandled exceptions return a JSON 500 that
# still passes through CORSMiddleware (instead of being swallowed by
# Starlette's ServerErrorMiddleware without CORS headers).
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error("Unhandled exception: %s\n%s", exc, traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": f"{type(exc).__name__}: {exc}"},
    )


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(books.router)
app.include_router(reviews.router)
app.include_router(shelves.router)
app.include_router(feed.router)


@app.get("/health")
def health():
    return {"status": "ok"}
