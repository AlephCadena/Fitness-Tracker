const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/workouts", (req, res) => {
  Workout.create(req)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {

    Workout.aggregate([
        {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
        },
    ])

    .sort({ day: -1 })
    .limit(7).sort({day:1})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
module.exports = router;