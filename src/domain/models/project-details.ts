import { Segment } from './segment'

export class ProjectDetails {
  private _projectName: string
  private _totalMinutes: number
  private _totalSegments: number
  private _segments: Segment[]

  constructor(projectsValues: any[], rowCounts: number, name: string) {
    this._projectName = name

    this._segments = projectsValues
      .filter((row) => row.stop_time !== null)
      .map((row) => {
        return {
          startTime: row.start_time,
          endTime: row.stop_time,
          minutes: row.minutes_spended,
        }
      })
    this._totalSegments = this._segments.length
    this._totalMinutes = projectsValues
      .map((row) => row.minutes_spended)
      .reduce((sum, current) => sum + current, 0)
  }

  get projectName(): string {
    return this._projectName
  }
  get totalMinutes(): number {
    return this._totalMinutes
  }
  get totalSegments(): number {
    return this._totalSegments
  }
  get segments(): Segment[] {
    return this._segments
  }
}
