const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

exports.checkID = (req, res, next, val) => {
  console.log(`tour id is :${val}`)

  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  next()
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price'
    })
  }
  next()
}

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  })
}

exports.CreatNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  // eslint-disable-next-line prefer-object-spread
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

exports.getTour = (req, res) => {
  const id = req.params.id * 1

  const tour = tours.find((el) => el.id === id)
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...></Updated>'
    }
  })
}
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  })
}
