const db = require('./../db')
const Todo = db.Todo

module.exports = async function (req, res) {

  if (req.body.priority == 'HIGH') { //sisend tuleb meile kui taski lood
    req.body.priorityNum = 1;
  } else if (req.body.priority =='LOW') {
    req.body.priorityNum = 3;
  } else {
    req.body.priorityNum = 2;
  }
  
  try {
    await Todo.create(req.body)
    res.status(200).json({ message: 'Success create' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
