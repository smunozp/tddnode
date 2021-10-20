import pool from './postgres-conector'

async function pgQuery(
  query: string,
  values: (string | number)[] = []
): Promise<string> {
  let client
  let pgCall
  try {
    client = await pool.connect()

    if (client != null) {
      pgCall = await client.query(query, values)
      client.release()
    }
    return JSON.stringify(pgCall)
  } catch (error) {
    console.log('error pgquery.....', error, 'with query:', query, values)

    if (client != null) client.release()

    throw new Error(JSON.stringify(error))
  }
}

export default pgQuery
