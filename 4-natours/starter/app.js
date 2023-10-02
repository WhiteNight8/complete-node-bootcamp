const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
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
// app.get('/api/v1/tours', getAllTour)
// app.post('/api/v1/tours', CreatNewTour)
// app.get('/api/v1/tours/:id', getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours').get(getAllTour).post(CreatNewTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

const port = 3000
app.listen(port, () => {
  console.log(`app runnning on port${port}`)
})
