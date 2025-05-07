const GOAL = require("../models/goals");

const createGoals = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "provide title and description" });
  }
  try {
    //create or save
    const goal = await GOAL.create(req.body);
    return res.status(201).json({ success: true, goal });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

//finding all goals
const getAllGoals = async (req, res) => {
  const goals = await GOAL.find().sort("-createdAt");
  res.status(200).json({ successs: true, num: goals.length, goals });
};

const getOnGoingGoals = async (req, res) => {
  const goals = await GOAL.find({ progress: { $lt: 100 } }).sort("-createdAt");
  res.status(200).json({ successs: true, num: goals.length, goals });
};

const getCompletedGoals = async (req, res) => {
  const goals = await GOAL.find({ progress: { $eq: 100 } }).sort("-createdAt");
  res.status(200).json({ successs: true, num: goals.length, goals });
};

//finding a document inside a database
const getSingleGoals = async (req, res) => {
  const { goalId } = req.params;
  const goal = await GOAL.findById(goalId);
  res.status(200).json({ success: true, goal });
};

//findbyIdAndUpdate(id, req.body,{new:true. runValidators: true});
const updateGoals = async (req, res) => {
  const { goalId } = req.params;
  try {
    const goal = await GOAL.findByIdAndUpdate(goalId, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json({ success: true, goal });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const deleteGoals = async (req, res) => {
  const { goalId } = req.params;
  const goal = await GOAL.findByIdAndDelete(goalId);
  res.status(200).json({success: true, message: "Goal Delete"})
};

module.exports = {
  createGoals,
  getAllGoals,
  getOnGoingGoals,
  getCompletedGoals,
  getSingleGoals,
  updateGoals,
  deleteGoals,
};
