const express = require("express");
const router = express.Router();

const {
  getTodoTasks,
  getDoneTasks,
  getAllTasks,
  createTask,
  moveTask,
  deleteDoneTask,
  deleteTodoTask,
  deleteTask,
  getTasksByName,
} = require("./controllers");

router.get("/todo-tasks", getTodoTasks);
router.get("/done-tasks", getDoneTasks);
router.get("/all-tasks", getAllTasks);
// id is mongo object _id and toTask is todo or done
router.get("/moveTask/:id/:toTask", moveTask);
router.post("/createTask", createTask);
router.delete("/:id/:toTask", deleteDoneTask);
router.delete("/:id/:toTask", deleteTodoTask);
router.get("/deleteTask/:id/:toTask", deleteTask);
router.get("/getTasksByName/:userName", getTasksByName);

module.exports = router;
