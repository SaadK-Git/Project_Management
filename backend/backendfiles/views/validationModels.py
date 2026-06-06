from pydantic import BaseModel, Field
from datetime import datetime
class ProjectCreate(BaseModel):
    name: str 
    description: str | None = None

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: str | None = None
    completed_tasks: int = Field(0)
    total_tasks: int = Field(0)
    created_at: datetime


class TaskCreate(BaseModel):
    title: str
    priority: str = "Medium"
    status: str = "To Do"
    due_date: datetime | None = None
    project_id: int

class TaskResponse(BaseModel):
    id: int
    title: str
    priority: str
    status: str
    due_date: datetime | None = None
    project_id: int

class TaskUpdate(BaseModel):
    status : str
