const express = require('express')
const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  })
}

const CreatNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    }
  )
}

const getTour = (req, res) => {
  console.log(req.params)

  const id = req.params.id * 1

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  const tour = tours.find((el) => el.id === id)
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...></Updated>'
    }
  })
}
const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  })
}

const router = express.Router()

router.route('/').get(getAllTour).post(CreatNewTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
