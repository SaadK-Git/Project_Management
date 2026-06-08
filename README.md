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
