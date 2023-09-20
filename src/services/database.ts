import * as mysql from 'mysql'
import { consola } from 'consola'

const databaseCredentials = {
    host     : 'mysql',
    user     : 'thomas',
    password : 'thomas',
    port: 3306,
    database : 'find_my_meal_console',
    authPlugin: 'mysql_native_password'
}

const connection: mysql.Connection = mysql.createConnection(databaseCredentials)
connection.connect((err) => {
    if (err) {
        consola.error(`Unable to connect to ${databaseCredentials.database} with user "${databaseCredentials.user}" and password "${databaseCredentials.password}"`)
        consola.error(err)
    }
})

export function getConnection(): mysql.Connection {
    return connection
}

export function clean(): void {
    connection.query(
        'TRUNCATE TABLE receipts',
        (error) => {
            if (error) {
                consola.error(error)
            }
            else {
                consola.success('All meals have been deleted.')
            }
        }
    )
}