import express from "express";
const router = express.Router();

// Save time per user session
router.post("/", (req, res) => {
  if (!req.session.times) {
    req.session.times = [];
  }

  const { seconds } = req.body;
  const newTime = { time: seconds, id: req.session.times.length + 1 };
  req.session.times.push(newTime);

  res.status(201).json(req.session.times);
});

router.get("/", (req, res) => {
  res.status(200).json(req.session.times || []);
});

router.get("/truncate", (req, res) => {
  req.session.times = [];
  res.status(200).json(req.session.times);
});

export default router;
