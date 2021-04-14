const db = require("../db");
const Todo = db.Todo;

module.exports = async function (req, res) {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
