export class NotFoundError extends Error {
  constructor(paramName: string) {
    super(`Project "${paramName}" doesnt exist`)
    this.name = `Project "${paramName}" doesnt exist at that database`
  }
}
