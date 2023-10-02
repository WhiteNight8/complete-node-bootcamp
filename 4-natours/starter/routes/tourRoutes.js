const express = require('express')
const tourController = require('./../controllers/tourController')

const router = express.Router()

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.CreatNewTour)
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router
