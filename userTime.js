import express from 'express';
const router = express.Router();

let times = [];
router.post('/', async (req, res) => {
  const { seconds } = req.body;
  const newTime = { time: seconds, id: times.length + 1 };
  times.push(newTime)
  res.status(201).json(times);
});
router.get('/', (req, res) => {
  res.status(201).json(times);
})
router.get('/Truncate', (req, res) => {
  times = [];
  res.status(201).json(times);
});
export default router;