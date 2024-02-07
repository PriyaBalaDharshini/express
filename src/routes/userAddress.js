import express from 'express';
import UserAddressController from '../controllers/userAddress.js'

const router = express.Router();
router.use("/", UserAddressController.getUserAddress)

export default router