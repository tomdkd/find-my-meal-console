import * as mysql from 'mysql'
import { consola } from 'consola'
import { Meal } from '../interfaces/meal.interface'
import 'dotenv/config'

export class DatabaseService {

    private connection: mysql.Connection

    constructor() {
        const databaseCredentials = {
            host     : 'mysql',
            user     : process.env.DATABASE_USERNAME ?? '',
            password : process.env.DATABASE_PASSWORD ?? '',
            port: 3306,
            database : process.env.DATABASE_NAME ?? 'find_my_meal_console',
            authPlugin: 'mysql_native_password'
        }

        this.connection = mysql.createConnection(databaseCredentials)
        this.connection.connect((err) => {
            if (err) {
                consola.error({
                    message: `Unable to connect to ${databaseCredentials.database} with user "${databaseCredentials.user}" and password "${databaseCredentials.password}"`,
                    error: err
                })
            }
        })
    }

    query(sql: string, parameters?: unknown[]): Promise<Meal[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(
                sql,
                parameters,
                (error, result) => {
                    if (error) { consola.error(error); reject() }
                    else { resolve(result) }
                }
            )
        })
    }

    clean(): void {
        this.query('TRUNCATE TABLE receipts;')
    }
}