const db = require("../db");
const Todo = db.Todo;
const Done = db.Done;

module.exports = async function (req, res) {
  try {
    const toDoTask = await Done.findById({ _id: req.body._id }).lean().exec();
    if (toDoTask !== null) {
      await Done.deleteOne(toDoTask);
    }
    const doneTask = await Todo.findById({ _id: req.body._id })
      .limit(100)
      .lean()
      .exec();
    if (doneTask !== null) {
      await Todo.deleteOne(doneTask);
    }
    res.status(200).json({ message: "Success Delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error");
  }
};
