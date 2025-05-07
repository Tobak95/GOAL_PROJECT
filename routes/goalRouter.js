const router = require("express").Router();
const {
  createGoals,
  getAllGoals,
  getCompletedGoals,
  getOnGoingGoals,
  getSingleGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");


router.post("/", createGoals)
router.get('/', getAllGoals)
router.get("/completed", getCompletedGoals);
router.get("/ongoing", getOnGoingGoals);
router.get("/:goalId", getSingleGoals);
router.patch("/:goalId", updateGoals);
router.delete("/:goalId", deleteGoals);

module.exports = router;
