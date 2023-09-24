
# Task Management Documentaion

## Objective

Build a RESTful API for a simple task manager application.

## Project Description

In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks should have a title, description, and a flag for completion status. The API should be tested using Postman or Curl.
## Endpoints

## Priority Levels

- Low
- Medium
- High

### Get Tasks

- **Endpoint:** `/tasks`
- **Method:** `GET`
- **Description:** Retrieve a list of tasks.
- **Query Parameters:**
  - `isComplete` (boolean, optional): Filter tasks by completion status. Example: `isComplete=true`.

### Create Task

- **Endpoint:** `/tasks`
- **Method:** `POST`
- **Description:** Create a new task.
- **Request Body:** JSON
  - Example:
    ```json
    {
      "title": "Important Project Task",
      "description": "Complete the project",
      "level": "high",
      "isComplete": false
    }
    ```

### Get Task by ID

- **Endpoint:** `/tasks/:taskId`
- **Method:** `GET`
- **Description:** Retrieve a task by its ID.
- **Path Variables:**
  - `taskId` (string): Unique identifier for the task.

### Update Task by ID

- **Endpoint:** `/tasks/:taskId`
- **Method:** `PUT`
- **Description:** Update a task by its ID.
- **Path Variables:**
  - `taskId` (string): Unique identifier for the task.
- **Request Body:** JSON
  - Example:
    ```json
    {
      "title": "Sample Task 2",
      "description": "Task description",
      "level": "medium",
      "isComplete": true
    }
    ```

### Delete Task by ID

- **Endpoint:** `/tasks/:taskId`
- **Method:** `DELETE`
- **Description:** Delete a task by its ID.
- **Path Variables:**
  - `taskId` (string): Unique identifier for the task.

### Get Tasks by Priority Level

- **Endpoint:** `/tasks/priority/:level`
- **Method:** `GET`
- **Description:** Retrieve tasks by priority level.
- **Path Variables:**
  - `level` (string): Priority level of the tasks. Example: `level=` `low`/`medium`/`hight`.

## Example Usage

Here are some example requests you can make using cURL to interact with the API:

### Get Tasks (with Filtering)

To retrieve a list of completed tasks, you can use the following endpoint:

```shell
curl -X GET "http://localhost:3000/tasks?isComplete=true"
```

### Create a New Task

To create a new task, make a POST request with the task details:
```shell
curl -X POST "http://localhost:3000/tasks" -H "Content-Type: application/json" -d '{
  "title": "Important Project Task",
  "description": "Complete the project",
  "level": "high",
  "isComplete": false
}'
```

### Get Task by ID

To retrieve a specific task by its ID, make a GET request with the task ID:
```shell
curl -X GET "http://localhost:3000/tasks/71397550"
```

### Update Task by ID

To update a specific task by its ID, make a PUT request with the task ID and updated details:
```shell
curl -X PUT "http://localhost:3000/tasks/71397550" -H "Content-Type: application/json" -d '{
  "title": "Sample Task 2",
  "description": "Task description",
  "level": "medium",
  "isComplete": true
}'
```


### Delete Task by ID

To delete a specific task by its ID, make a DELETE request with the task ID:
```shell
curl -X DELETE "http://localhost:3000/tasks/71397550"
```

### Get Tasks by Priority Level
To retrieve tasks by priority level, make a GET request with the desired priority level:
```shell
curl -X GET "http://localhost:3000/tasks/priority/high"
```

### Usage Guidelines
- Ensure that you provide valid data in the request body when creating or updating tasks.
- Use the appropriate HTTP methods and endpoints for your desired operations.