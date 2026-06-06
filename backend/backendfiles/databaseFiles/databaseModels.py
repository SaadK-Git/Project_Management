from sqlalchemy import Column, Enum, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .databaseConnection import Base

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer,primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=False)

    tasks = relationship("Task", back_populates="project")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(length=200), nullable=False)
    priority = Column(Enum("Low", "Medium", "High", name="priority_levels"), nullable=False,default="Medium")
    status = Column(Enum("To Do", "In Progress", "Done", name="status_levels"), nullable=False,default="To Do")
    due_date = Column(DateTime, nullable=True)

    project_id = Column(Integer, ForeignKey("projects.id",ondelete = "CASCADE"),nullable=False,index=True)
    project = relationship("Project", back_populates="tasks")