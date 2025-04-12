const utils = require('../utils')
const express = require('express')
const db = require('../db')
const { request, response } = require('express')

const router = express.Router()

router.get('/show-train_type/:trainTypeId/:coachId', (request, response) => {

  const {trainTypeId,coachId}=request.params

  const statement = `select train_type_id,coach_id from coach_counts where train_type_id=? and coach_id=? ;`

  db.pool.query(statement,[trainTypeId,coachId], (error, train) => {

    response.send(utils.createResult(error, train))

  })

})


router.get('/show-stations',(request,response)=>{
  const statement= `SELECT station_id,station_name from stations;`

  db.pool.query(statement,(error,stations)=>{
    response.send(utils.createResult(error,stations))
  })
})

router.get('/train-type',(request,response)=>{
  const statement=`Select train_type_id from train_type;`

  db.pool.query(statement,(error,traintype)=>{
    response.send(utils.createResult(error,traintype))
  })
})

router.get('/train-no',(request,response)=>{
  const statement='select train_no,train_type from trains'

  db.pool.query(statement,(error,trains)=>{
    response.send(utils.createResult(error,trains))
  })

})

router.get('/coach',(request,response)=>{
  const statement=`select coach_id from coaches`

  db.pool.query(statement,(error,coaches)=>{
    response.send(utils.createResult(error,coaches))
  })

})

router.get('/train/:trainno',(request,response)=>{

  const {trainno}=request.params

  const statement='select train_type from trains where train_no=?'

  db.pool.query(statement,[trainno],(error,coaches)=>{
    response.send(utils.createResult(error,coaches))
  })

})

module.exports = router
