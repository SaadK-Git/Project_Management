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
