import { DatabaseError } from '../../errors/database'
import { QueryResult } from '../../interfaces/query-result-Interface'
import pgQuery from '../services/postgresdb/query-helper'

export class ReportRepository {
  async getAllProjects(): Promise<QueryResult> {
    try {
      const response = await pgQuery(
        'select SUM(minutes_spended) as minutes, project_name from project_tracking GROUP BY project_name'
      )

      const responseValues = JSON.parse(response).rows
      const responseRows = JSON.parse(response).rowCount

      return { rowCount: responseRows, data: responseValues }
    } catch (error) {
      throw new DatabaseError((error as Error).message)
    }
  }

  async getProjectDetail(projectName: string): Promise<QueryResult> {
    try {
      const response = await pgQuery(
        'select  minutes_spended, project_name from project_tracking where project_name = $1',
        [projectName]
      )

      const responseValues = JSON.parse(response).rows
      const responseRows = JSON.parse(response).rowCount

      return { rowCount: responseRows, data: responseValues }
    } catch (error) {
      throw new DatabaseError((error as Error).message)
    }
  }
}
