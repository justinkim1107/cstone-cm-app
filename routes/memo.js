const express = require('express');
const router = express.Router();
const Memo = require('../models/Memo');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  const memos = req.user.role === 'admin'
    ? await Memo.find().populate('userId', 'username')
    : await Memo.find({ userId: req.user.userId });

  res.json(memos);
});

router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const memo = new Memo({ userId: req.user.userId, title, content });
  await memo.save();
  res.json(memo);
});

router.put('/:id', auth, async (req, res) => {
  const memo = await Memo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  );
  res.json(memo);
});

module.exports = router;
