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
  downloadFile,
  getAllDistinctUsers,
} = require("./controllers");

router.get("/todo-tasks", getTodoTasks);
router.get("/done-tasks", getDoneTasks);
router.get("/all-tasks", getAllTasks);
// id is mongo object _id and toTask is todo or done
router.get("/moveTask/:id/:toTask", moveTask);
router.post("/createTask", createTask);
router.delete("/:id/:toTask", deleteDoneTask);
router.delete("/:id/:toTask", deleteTodoTask);
router.delete("/deleteTask", deleteTask);
router.get("/getTasksByName/:userName", getTasksByName);
router.post("/downloadFile", downloadFile);
router.get("/distinctUsers", getAllDistinctUsers);

module.exports = router;
