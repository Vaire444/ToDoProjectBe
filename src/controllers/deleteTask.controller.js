const db = require("../db");
const Todo = db.Todo;
const Done = db.Done;

module.exports = async function (req, res) {
  try {
    if (req.params.toTask === "done") {
      const donetask = await Done.findOne({ _id: req.body.id }).lean().exec();
      await Done.deleteOne(donetask);
    }
    if (req.params.toTask === "todo") {
      const todoTask = await Todo.deleteOne({ _id: req.body.id })
        .limit(100)
        .lean()
        .exec();
      await Todo.deleteOne(todoTask);
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error");
  }
};
