export class DatabaseError extends Error {
  constructor(message: string) {
    super(`Database Error ${message}`)
    this.name = `Database Error ${message}`
  }
}
