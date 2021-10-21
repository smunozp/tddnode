export class ProjectDetails {
  private _projectName: string
  private _totalMinutes: number
  private _totalSegments: number
  private _segments: number[]

  constructor(projectsValues: any[], rowCounts: number, name: string) {
    this._projectName = name
    this._totalSegments = rowCounts
    this._segments = projectsValues.map((row) => row.minutes_spended)
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
  get segments(): number[] {
    return this._segments
  }
}
