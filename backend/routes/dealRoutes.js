const express = require('express');
const { createDeal, getDeal, updateDealStatus, getDealById } = require('../controllers/dealController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createdeal',authMiddleware,createDeal ); // Create a deal
router.get('/getdeal',authMiddleware, getDeal); //get deal
router.get('/:id', authMiddleware, getDealById);//get single deal
router.put("/:dealId/status", authMiddleware,updateDealStatus);//update Deal status


module.exports = router;