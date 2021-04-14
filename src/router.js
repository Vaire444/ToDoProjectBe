const express = require("express");
const router = express.Router();

const {
  getTodoTasks,
  getDoneTasks,
  createTask,
  moveTask,
  deleteDoneTask,
  deleteTodoTask,
} = require("./controllers");

router.get("/todo-tasks", getTodoTasks);
router.get("/done-tasks", getDoneTasks);
// id is mongo object _id and toTask is todo or done
router.get("/moveTask/:id/:toTask", moveTask);
router.post("/createTask", createTask);
router.delete("/:id", deleteDoneTask);
router.delete("/:id", deleteTodoTask);

module.exports = router;
