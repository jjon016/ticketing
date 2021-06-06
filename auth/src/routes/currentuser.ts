import express, { Router } from 'express';
import { currentUser } from '@fadecoding/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
