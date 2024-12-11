let tasks = [];

const getAllTasks = (req, res) => {
  res.status(200).json({ success: true, data: tasks });
};

const createTask = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'Please provide name value' });
  }

  const task = {
    id: tasks.length + 1,
    name,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(task);
  res.status(201).json({ success: true, data: task });
};

const getTask = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === Number(id));

  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `No task with id ${id}` });
  }

  res.status(200).json({ success: true, data: task });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  const task = tasks.find(task => task.id === Number(id));

  if (!task) {
    return res
      .status(404)
      .json({ success: false, msg: `No task with id ${id}` });
  }

  if (name) task.name = name;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json({ success: true, data: task });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  if (taskIndex === -1) {
    return res
      .status(404)
      .json({ success: false, msg: `No task with id ${id}` });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ success: true, msg: 'Task deleted successfully' });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
