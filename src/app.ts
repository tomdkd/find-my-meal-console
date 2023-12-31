import { consola } from 'consola'
import { MealService } from './services/meal.service'
import { program } from 'commander'
import csv from 'csv-parser'
import * as fs from 'fs'
import { type Meal } from './interfaces/meal.interface'
import { DatabaseService } from './services/database.service'
import { CSVService } from './services/csv.service'


(async () => {
    const meal: MealService = new MealService()
    const allMeals: Meal[] = await meal.getAllMeals()
    const mealsNumber: number = allMeals.length
    const database: DatabaseService = new DatabaseService()

    program
        .name('node dist/app.js')
        .description('You will get ideas for your meals during this week !')
        .version('0.0.2')

    program.command('find')
        .description('Let the application choose what you could do !')
        .argument('<number>', 'Specify the number of meals you want.')
        .action(async (number) => {
            const mealsFiltered: Meal[] = await meal.getRandomMeals(allMeals, number)
            if (mealsFiltered.length > 0) { consola.box(mealsFiltered.map((meal) => { return meal.name }).join('\n')) }
            const save: boolean = await consola.prompt('Do you want to save this choice ?', { type: 'confirm' })

            if (save) {
                const csvService: CSVService = new CSVService()
                const lines: string[] = await csvService.createListeDeCourse(mealsFiltered)
                fs.writeFileSync('liste_de_course.txt', lines.join('\n'))
                consola.success('File liste_de_course.txt created !')
            }
        })

    program.command('count')
        .description('Get the number of meals you have in database.')
        .action(async () => {
            consola.box(`You have ${mealsNumber} meal(s) saved.`)
        })

    program.command('convert')
        .description('Let the application to convert your csv file with meals into a json string array you can use for add_many command !')
        .argument('<path>', 'The path of the csv file')
        .option('-h, --header', 'Use this option to skip the first row (corresponding to header)')
        .action((path) => {
            const results: Array<{ name: string, content: string }> = []
            fs.createReadStream(path)
                .pipe(csv())
                .on('data', (data: { name: string, content: string }) => results.push(data))
                .on('end', () => {
                    consola.success(`${results.length} rows found.`)
                    results.forEach(async (element) => {
                        await meal.addMeal(element.name, element.content)
                    })
                })
        })

    program.command('export')
        .description('Save all your meals into a csv file.')
        .action(async () => {
            const lines = ['name,content']
            allMeals.forEach((meal: Meal) => {
                lines.push(`${meal.name},${meal.content}`)
            })

            fs.writeFileSync('export.csv', lines.join('\n'))
            consola.success('Database exported')
        })

    program.command('clean')
        .description('Delete all meals saved.')
        .action(async () => {
            const response: boolean = await consola.prompt(`You will delete ${mealsNumber} meal(s). Are you sure?`, { type: 'confirm' })
            if (response) {
                database.clean()
            }
        })

    program.parse()
})()

