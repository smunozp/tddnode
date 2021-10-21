import { TrackingProjectRepository } from '../../infra/repositories/tracking-project-repository'
import { STATUS } from './status-enum'
export class LastProjectSegment {
  private _segmentId: number
  private _projectName: string
  private _status: string
  private _minutes: number
  private _startTime: Date
  private _endTime: Date
  private _projectExist: boolean

  constructor(projectName: string) {
    this._projectName = projectName
  }

  async getLastSegmentProject(): Promise<void> {
    const projectTracking = new TrackingProjectRepository()

    const lastSegmentResult = await projectTracking.getLastSegmentProject(
      this._projectName
    )

    if (lastSegmentResult.rowCount === 0) {
      this._projectExist = false
      return
    }

    this._segmentId = lastSegmentResult.data.id
    this._startTime = lastSegmentResult.data.start_time
    this._status = lastSegmentResult.data.status
    this._projectExist = true
  }

  isStarted(): boolean {
    if (this._status === STATUS.started) {
      return true
    } else {
      return false
    }
  }

  private getTrackingMinutes() {
    const difference =
      new Date(this._endTime).getTime() - new Date(this._startTime).getTime() // This will give difference in milliseconds
    const resultInMinutes = Math.round(difference / 60000)
    return resultInMinutes
  }

  async startRegister(): Promise<void> {
    this._startTime = new Date()
    this._status = STATUS.started

    const trackingRepository = new TrackingProjectRepository()

    const response = await trackingRepository.startSegmentTracking(
      this._projectName,
      this._startTime
    )
  }

  async stopRegister(): Promise<boolean> {
    if (this._status !== STATUS.started) {
      return false
    }
    this._endTime = new Date()

    const minutesSpended = this.getTrackingMinutes()

    const trackingRepository = new TrackingProjectRepository()

    await trackingRepository.stopSegmentTracking(
      this._projectName,
      minutesSpended,
      this._endTime,
      this._segmentId
    )

    return true
  }

  get projectName(): string {
    return this._projectName
  }
  get projectExist(): boolean {
    return this._projectExist
  }
}
