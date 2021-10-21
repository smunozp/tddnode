import { STATUS } from '../../domain/models/status-enum'
import { DatabaseError } from '../../errors/database'
import { QueryResult } from '../../interfaces/query-result-Interface'
import pgQuery from '../services/postgresdb/query-helper'

export class TrackingProjectRepository {
  async getLastSegmentProject(name: string): Promise<QueryResult> {
    try {
      const response = await pgQuery(
        'SELECT status, id, start_time, project_name FROM project_tracking WHERE project_name =$1 ORDER BY id DESC LIMIT 1',
        [name]
      )

      const responseValues = JSON.parse(response).rows[0]
      const responseRows = JSON.parse(response).rowCount

      return { rowCount: responseRows, data: responseValues }
    } catch (error) {
      throw new DatabaseError((error as Error).message)
    }
  }

  async startSegmentTracking(
    projectName: string,
    dateTime: Date
  ): Promise<QueryResult> {
    try {
      const response = await pgQuery(
        'INSERT INTO project_tracking ("start_time", "project_name", "status") VALUES ($1,$2,$3) RETURNING id',
        [dateTime, projectName, STATUS.started]
      )
      //console.log(JSON.parse(response))

      const responseValues = JSON.parse(response).rows
      const responseRows = JSON.parse(response).rowCount

      return { rowCount: responseRows, data: responseValues }
    } catch (error) {
      throw new DatabaseError((error as Error).message)
    }
  }

  async stopSegmentTracking(
    projectName: string,
    minutesSpended: number,
    endTime: Date,
    trackingId: number
  ): Promise<QueryResult> {
    try {
      const response = await pgQuery(
        'UPDATE project_tracking SET stop_time = $1, status = $2, minutes_spended = $3 WHERE id = $4',
        [endTime, 'STOPPED', minutesSpended, trackingId]
      )
      //console.log(JSON.parse(response))

      const responseValues = JSON.parse(response).rows
      const responseRows = JSON.parse(response).rowCount

      return { rowCount: responseRows, data: responseValues }
    } catch (error) {
      throw new DatabaseError((error as Error).message)
    }
  }
}
