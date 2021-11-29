const router = require("express").Router();
const Exercise = require("../models/workout.js");

router.get("/workouts", (req, res) => {
  Exercise.aggregate([
    {$addFields: { totalDuration: { $sum: "$exercises.duration" }}},
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/workouts/:id", (req, res) => {
  Exercise.findByIdAndUpdate(
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
  Exercise.create(req)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
     // console.log('hello')
    Exercise.aggregate([
        {$addFields: { totalDuration: { $sum: "$exercises.duration" }}},
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