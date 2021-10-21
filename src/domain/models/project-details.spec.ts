import { ProjectDetails } from './project-details'

const testDetailDataRows = [
  {
    minutes_spended: 25,
    start_time: '2021-10-20T20:20:44.983Z',
    stop_time: '2021-10-20T20:45:29.001Z',
    project_name: 'abc',
  },
  {
    minutes_spended: 2,
    start_time: '2021-10-20T20:46:28.855Z',
    stop_time: '2021-10-20T20:48:15.338Z',
    project_name: 'abc',
  },
  {
    minutes_spended: 7,
    start_time: '2021-10-21T02:12:48.386Z',
    stop_time: '2021-10-21T02:20:17.124Z',
    project_name: 'abc',
  },
  {
    minutes_spended: 4,
    start_time: '2021-10-21T12:34:38.174Z',
    stop_time: '2021-10-21T12:38:30.935Z',
    project_name: 'abc',
  },
]
const testDetailDataToFilterRows = [
  {
    minutes_spended: 25,
    start_time: '2021-10-20T20:20:44.983Z',
    stop_time: '2021-10-20T20:45:29.001Z',
    project_name: 'abc',
  },
  {
    minutes_spended: 2,
    start_time: '2021-10-20T20:46:28.855Z',
    stop_time: '2021-10-20T20:48:15.338Z',
    project_name: 'abc',
  },
  {
    minutes_spended: 7,
    start_time: '2021-10-21T02:12:48.386Z',
    stop_time: '2021-10-21T02:20:17.124Z',
    project_name: 'abc',
  },
  {
    minutes_spended: null,
    start_time: '2021-10-21T12:34:38.174Z',
    stop_time: null,
    project_name: 'abc',
  },
]
const testNumberRows = 4
const testName = 'abc'

describe('Process project details', () => {
  it('should process segments', () => {
    const sut = new ProjectDetails(testDetailDataRows, testNumberRows, testName)

    const totalMinutes = sut.totalMinutes
    const totalSegments = sut.totalSegments
    const segments = sut.segments

    expect(totalMinutes).toBe(38)
    expect(totalSegments).toBe(4)
    expect(segments).toEqual([
      {
        startTime: '2021-10-20T20:20:44.983Z',
        endTime: '2021-10-20T20:45:29.001Z',
        minutes: 25,
      },
      {
        startTime: '2021-10-20T20:46:28.855Z',
        endTime: '2021-10-20T20:48:15.338Z',
        minutes: 2,
      },
      {
        startTime: '2021-10-21T02:12:48.386Z',
        endTime: '2021-10-21T02:20:17.124Z',
        minutes: 7,
      },
      {
        startTime: '2021-10-21T12:34:38.174Z',
        endTime: '2021-10-21T12:38:30.935Z',
        minutes: 4,
      },
    ])
  })

  it('should filter segments no stopped', () => {
    const sut = new ProjectDetails(
      testDetailDataToFilterRows,
      testNumberRows,
      testName
    )

    const totalMinutes = sut.totalMinutes
    const totalSegments = sut.totalSegments
    const segments = sut.segments

    expect(totalMinutes).toBe(34)
    expect(totalSegments).toBe(3)
    expect(segments).toEqual([
      {
        startTime: '2021-10-20T20:20:44.983Z',
        endTime: '2021-10-20T20:45:29.001Z',
        minutes: 25,
      },
      {
        startTime: '2021-10-20T20:46:28.855Z',
        endTime: '2021-10-20T20:48:15.338Z',
        minutes: 2,
      },
      {
        startTime: '2021-10-21T02:12:48.386Z',
        endTime: '2021-10-21T02:20:17.124Z',
        minutes: 7,
      },
    ])
  })
})
