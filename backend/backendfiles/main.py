from fastapi import FastAPI;
from views.endpoints import router
from databaseFiles.databaseConnection import Base, engine
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
@asynccontextmanager
async def lifespan(app: FastAPI):
    #App starts..
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

    yield
    
    #App ends..

app = FastAPI(lifespan=lifespan)
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(router, prefix="/api")