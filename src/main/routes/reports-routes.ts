import { HttpRequest, HttpResponse } from './../../interfaces/http-interface'
import { Router } from 'express'
import pgQuery from '../../infra/services/postgresdb/query-helper'

export default (router: Router): void => {
  router.get('/list-all', async (_, res) => {
    try {
      const response = await pgQuery(
        'select SUM(minutes_spended) as minutes, project_name from project_tracking GROUP BY project_name'
      )

      const responseValues = JSON.parse(response).rows
      const responseRows = JSON.parse(response).rowCount

      console.log('response', responseValues)
      res.status(200).send({
        'projects-count': responseRows,
        'projects-details': responseValues,
      })
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.get('/list-detail', async (req, res) => {
    const { name } = req.query

    if (!name) {
      res.status(400).send('Parameter "name" not found')
    }

    try {
      const response = await pgQuery(
        'select  minutes_spended, project_name from project_tracking where project_name = $1',
        [String(name)]
      )

      const responseValues = JSON.parse(response).rows
      const responseRows = JSON.parse(response).rowCount

      if (responseRows === 0) {
        res.status(400).send(` Project "${name}" not Found`)
      }
      const segments = responseValues.map((row) => row.minutes_spended)
      const totalMinutes = responseValues
        .map((row) => row.minutes_spended)
        .reduce((sum, current) => sum + current, 0)

      res.status(200).send({
        'project-name': name,
        'total-minutes': totalMinutes,
        'total-segments': responseRows,
        segments: segments,
      })
    } catch (error) {
      res.status(400).send((error as Error).message)
    }
  })
}
