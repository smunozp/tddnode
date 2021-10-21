import { HttpRequest, HttpResponse } from './../../interfaces/http-interface'
import { Router } from 'express'
import pgQuery from '../../infra/services/postgresdb/query-helper'
import { StopTrackingProject } from '../../controllers/tracking-project/stop-tracking'
import { AdaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/test', async (_, res) => {
    const response = await pgQuery('SELECT * FROM projects')
    console.log('response', response)
    res.send(200)
  })

  router.post('/start', async (req, res) => {
    try {
      //console.log('req.', req)
      console.log('req.body', req.body)
      const { name } = req.body
      //console.log('name', name)
      // last status of tracking specific project
      const response = await pgQuery(
        'SELECT status, id, start_time, project_name FROM project_tracking WHERE project_name =$1 ORDER BY id DESC LIMIT 1',
        [name]
      )
      const responseValues = JSON.parse(response).rows[0]
      const responseRows = JSON.parse(response).rowCount
      if (responseRows === 0) {
        startRegister(name)
      } else {
        if (responseValues.status === 'STARTED') {
          res.status(405).send('Project already started')
        } else {
          startRegister(name)
        }
      }

      res
        .status(200)
        .send(`Project ${responseValues.project_name} Tracking STARTED`)
    } catch (error) {
      res.status(400).send(JSON.stringify(error))
    }
  })

  router.post('/stop', AdaptRoute(new StopTrackingProject()))
  //   router.post('/signup', AdaptRoute(makeSignUpController()))
}

async function startRegister(projectName) {
  let dateTime = new Date()
  console.log('creando registrto')
  const response = await pgQuery(
    'INSERT INTO project_tracking ("start_time", "project_name", "status") VALUES ($1,$2,$3)',
    [dateTime, projectName, 'STARTED']
  )
}

// async function stopRegister(projectName, startTime, trackingId) {
//   let endTime = new Date()

//   const minutesSpended = getTrackingMinutes(new Date(startTime), endTime)
//   console.log('cerrando registrto')
//   const response = await pgQuery(
//     'UPDATE project_tracking SET stop_time = $1, status = $2, minutes_spended = $3 WHERE id = $4',
//     [endTime, 'STOPPED', minutesSpended, trackingId]
//   )
// }

// function getTrackingMinutes(startDate, endDate) {
//   const difference = endDate.getTime() - startDate.getTime() // This will give difference in milliseconds
//   const resultInMinutes = Math.round(difference / 60000)
//   return resultInMinutes
// }
