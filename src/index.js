const express = require("express");
const taskData = require("../tasks.json");
const validator = require("./helpers/validator");
const generator = require("./helpers/generator");
const path = require("path");
const filePath = path.join(__dirname, "..", "tasks.json");
const fs = require("fs");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Task Management API");
});

// get all tasks
app.get("/tasks", (req, res) => {
  // retreived task is in formatted iby created
  let tasks = JSON.parse(JSON.stringify(taskData)) ?? [];

  const isComplete = req.query.isComplete ?? false;
  if (isComplete) {
    tasks = tasks.filter((v) => v.isComplete);
  }

  return res.status(200).json({
    error: false,
    message: tasks.length == 0 ? "No data found" : "Data found",
    data: tasks,
  });
});

// get specific task
app.get("/tasks/:taskId", (req, res) => {
  const tasks = JSON.parse(JSON.stringify(taskData));

  const taskId = req.params.taskId;
  let filterCourse = tasks.filter((c) => c.taskId == taskId);
  if (filterCourse.length == 0) {
    return res.status(404).json({
      error: true,
      message: "No appropriate course found with appropriate id",
    });
  }

  return res.status(200).json({
    error: true,
    message: "No appropriate course found with appropriate id",
    data: filterCourse[0],
  });
});

// add a new task
app.post("/tasks", (req, res) => {
  const taskDetails = req.body;
  const dbData = JSON.parse(JSON.stringify(taskData));
  const isValidate = validator.payloadValidate(taskDetails);

  if (!isValidate.error) {
    let tasksModified = dbData;

    // generate a unique id for task
    taskDetails.taskId = generator.createTaskId(dbData.map((v) => v.taskId));

    tasksModified.push(taskDetails);

    // writing into file
    fs.writeFile(
      filePath,
      JSON.stringify(tasksModified),
      { encoding: "utf8", flag: "w" },
      (err, data) => {
        if (err) {
          res.status(500).send({
            error: true,
            message: "There was an issue while creating the task.",
          });
        } else {
          return res.status(200).json({
            error: false,
            message: "Task added successfully",
            data: taskDetails,
          });
        }
      }
    );
  } else {
    return res.status(400).send(isValidate);
  }
});

// update a task
app.put("/tasks/:taskId", (req, res) => {
  if (!Number.isInteger(parseInt(req.params.taskId, 10))) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid taskid. It must be an integer." });
  }
  const taskId = parseInt(req.params.taskId);

  const taskDetails = req.body;
  const dbData = JSON.parse(JSON.stringify(taskData));
  let isValidate = validator.payloadValidate(taskDetails);

  if (!isValidate.error) {
    const taskIds = dbData.map((v) => v.taskId);
    const taskIndex = taskIds.indexOf(taskId);
    if (taskIndex == -1) {
      return res.status(404).send({
        error: true,
        message: "No appropriate task found with appropriate id",
      });
    }

    let tasksModified = dbData;

    // List of keys to be updated
    const keysToUpdate = ["title", "description", "level", "isComplete"];

    // Iterate through the keys and update if they match the specified keys
    for (const key of keysToUpdate) {
      tasksModified[taskIndex][key] = taskDetails[key];
    }

    fs.writeFile(
      filePath,
      JSON.stringify(tasksModified),
      { encoding: "utf8", flag: "w" },
      (err, data) => {
        if (err) {
          res.status(500).send({
            error: true,
            message: "Something went wrong while creating the course",
          });
        } else {
          return res.status(200).json({
            error: false,
            message: "Task updated successfully",
          });
        }
      }
    );
  } else {
    return res.status(400).json(isValidate);
  }
});

// remove a task
app.delete("/tasks/:taskId", (req, res) => {
  if (!Number.isInteger(parseInt(req.params.taskId, 10))) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid taskid. It must be an integer." });
  }
  const taskId = parseInt(req.params.taskId);

  const dbData = JSON.parse(JSON.stringify(taskData));
  const taskIds = dbData.map((v) => v.taskId);
  const taskIndex = taskIds.indexOf(taskId);
  if (taskIndex == -1) {
    return res.status(404).send({
      error: true,
      message: "No appropriate task found with appropriate id",
    });
  }
  let tasksModified = dbData;
  tasksModified.splice(taskIndex, 1);

  fs.writeFile(
    filePath,
    JSON.stringify(tasksModified),
    { encoding: "utf8", flag: "w" },
    (err, data) => {
      if (err) {
        res.status(500).send({
          error: true,
          message: "Something went wrong while creating the course",
        });
      } else {
        return res.status(200).json({
          error: false,
          message: "Task deleted successfully",
        });
      }
    }
  );
});

// get tasks level wise
app.get("/tasks/priority/:level", (req, res) => {
  const validLevels = ["low", "medium", "high"];
  if (
    typeof req.params.level !== "string" ||
    !validLevels.includes(req.params.level)
  ) {
    return res
      .status(400)
      .json({
        error: true,
        message: "Invalid level, must be one of: low, medium, high.",
      });
  }

  const level = req.params.level;
  let tasks = JSON.parse(JSON.stringify(taskData)) ?? [];
  tasks = tasks.filter((v) => v.level == level);

  return res.status(200).json({
    error: false,
    message: tasks.length == 0 ? "No data found" : "Data found",
    data: tasks,
  });
});

// invalid routes
app.use((req, res) => {
  return res.status(404).json({ error: true, message: "Route not found" });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Something wrong !!!!!");
  } else {
    console.log("Server is running.......");
  }
});
