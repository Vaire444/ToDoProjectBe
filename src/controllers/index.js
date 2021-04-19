module.exports = {
  createTask: require("./createTask.controller"),
  getTodoTasks: require("./getTodoTasks.controller"),
  getDoneTasks: require("./getDoneTasks.controller"),
  getAllTasks: require("./getAllTasks.controller"),
  moveTask: require("./moveTask.controller"),
  deleteDoneTask: require("./deleteDoneTask.controller"),
  deleteTodoTask: require("./deleteTodoTask.controller"),
};
