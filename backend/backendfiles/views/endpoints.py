from .validationModels import ProjectCreate, ProjectResponse, TaskCreate, TaskResponse, TaskUpdate
from fastapi import APIRouter, Depends ,HTTPException      
from databaseFiles.databaseConnection import get_db
from databaseFiles.databaseModels import Project as DBProject, Task as DBTask
from sqlalchemy.orm import Session, joinedload
from datetime import UTC, datetime
router = APIRouter()

# Project Endpoints

@router.get("/projects", response_model=list[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):

    projects = db.query(DBProject).all()

    result = []

    for project in projects:
        total_tasks = len(project.tasks)

        completed_tasks = sum(
            1 for task in project.tasks
            if task.status == "Done"
        )

        result.append({
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "completed_tasks": completed_tasks,
            "total_tasks": total_tasks,
            "created_at": project.created_at
        })

    return result

@router.post("/projects", response_model=ProjectResponse)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    new_project = DBProject(
        name=project.name,
        description=project.description,
        created_at=datetime.now()
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {
        "id": new_project.id,
        "name": new_project.name,
        "description": new_project.description,
        "completed_tasks": 0,
        "total_tasks": 0,
        "created_at": new_project.created_at
    }

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(DBProject).filter(DBProject.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}

# Task Endpoints



@router.get("/projects/{project_id}/tasks", response_model=list[TaskResponse])
def get_tasks(project_id: int, db: Session = Depends(get_db)):
    project = (
        db.query(DBProject)
        .filter(DBProject.id == project_id)
        .first()
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project.tasks

@router.post("/projects/{project_id}/tasks", response_model=TaskResponse)
def create_task(project_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    project = db.query(DBProject).filter(DBProject.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    new_task = DBTask(
        title=task.title,
        priority=task.priority,
        status=task.status,
        due_date=task.due_date,
        project_id=project_id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not db_task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db_task.status = task.status

    db.commit()
    db.refresh(db_task)

    return db_task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}
