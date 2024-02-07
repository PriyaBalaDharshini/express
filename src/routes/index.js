import express from 'express';
import IndexController from '../controllers/index.js';
import UserRoutes from './user.js';
import addressRoute from './userAddress.js'

const router = express.Router();

router.get("/", IndexController.homePgae);

router.use("/user", UserRoutes);

router.use("/address", addressRoute);

export default router