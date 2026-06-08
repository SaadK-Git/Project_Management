# Project Management Dashboard - Frontend

A React-based frontend for a project and task management application.

The application provides a clean interface for creating projects, managing tasks, tracking progress, and organizing work by priority and status.

---

## Features

### Project Management

* View all projects
* Create new projects
* Delete existing projects
* Navigate to project-specific task boards
* Display task completion statistics for each project

### Task Management

* Create tasks within a project
* Assign priority levels:

  * High
  * Medium
  * Low
* Update task status:

  * To Do
  * In Progress
  * Done
* Delete tasks
* Filter tasks by priority

### Progress Tracking

* View completed task counts
* Track project progress in real time
* Automatic UI updates after task and project operations

---

## Technologies Used

* React
* React Router DOM
* JavaScript (ES6+)
* Fetch API
* Vite

---

## Dependencies

Install project dependencies:

```bash
npm install
```

Required packages:

```bash
npm install react react-dom react-router-dom
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Backend Connection

The frontend communicates with a FastAPI backend through REST API endpoints.

Current API configuration:

```javascript
const API = "http://127.0.0.1:8000/api";
```

Ensure the backend server is running before starting the frontend.

---

## Application Structure

```text
src/
├── pages/
│   ├── ProjectPage.jsx
│   └── TaskPage.jsx
│
├── App.jsx
├── main.jsx
```

---

## Component Overview

### ProjectPage

Responsible for:

* Fetching all projects
* Creating projects
* Deleting projects
* Displaying project statistics
* Navigation to task boards

### TaskPage

Responsible for:

* Fetching project details
* Fetching project tasks
* Creating tasks
* Updating task status
* Deleting tasks
* Filtering tasks by priority

---

## User Workflow

1. Open the Project Board.
2. Create a new project.
3. Open a project.
4. Create tasks inside the project.
5. Assign priorities to tasks.
6. Update task status as work progresses.
7. Monitor project completion through task statistics.

---

## Future Enhancements

* Edit project details
* Edit task details
* Search and filtering improvements
* Due date support
* Drag-and-drop task management
* User authentication
* Responsive mobile layout
* Dark/Light theme switching
# API Endpoints

This API provides project and task management functionality. Projects act as containers for tasks, while tasks can be created, updated, listed, and deleted within a project.

---

## Projects

### Get All Projects

**GET** `/projects`

Returns a list of all projects along with task statistics.

**Response includes:**

* Project ID
* Name
* Description
* Number of completed tasks
* Total number of tasks
* Creation timestamp

---

### Create Project

**POST** `/projects`

Creates a new project.

**Request Body:**

```json
{
  "name": "Project Name",
  "description": "Project Description"
}
```

**Response:**
Returns the newly created project with task counts initialized to zero.

---

### Delete Project

**DELETE** `/projects/{project_id}`

Deletes a project and its associated data.

**Path Parameters:**

* `project_id` – ID of the project to delete

**Errors:**

* `404 Project not found`

---

## Tasks

### Get Tasks for a Project

**GET** `/projects/{project_id}/tasks`

Returns all tasks belonging to a specific project.

**Path Parameters:**

* `project_id` – ID of the project

**Errors:**

* `404 Project not found`

---

### Create Task

**POST** `/projects/{project_id}/tasks`

Creates a new task under a project.

**Path Parameters:**

* `project_id` – ID of the project

**Request Body:**

```json
{
  "title": "Task Title",
  "priority": "High",
  "status": "Pending",
  "due_date": "2026-06-30"
}
```

**Errors:**

* `404 Project not found`

---

### Update Task Status

**PUT** `/tasks/{task_id}`

Updates the status of an existing task.

**Path Parameters:**

* `task_id` – ID of the task

**Request Body:**

```json
{
  "status": "Done"
}
```

**Errors:**

* `404 Task not found`

---

### Delete Task

**DELETE** `/tasks/{task_id}`

Deletes a task permanently.

**Path Parameters:**

* `task_id` – ID of the task

**Errors:**

* `404 Task not found`
