import { Meal } from '../interfaces/meal.interface'
import { getConnection } from '../services/database'
import { consola } from 'consola'

export async function getRandomMeals(meals: Meal[], number: number): Promise<Meal[]> {
    return new Promise((resolve) => {
        const mealsFiltered: Meal[] = []
        const mealsUsed: string[] = []
    
        for (let i = 0; i <= number; i++) {
            const randomNumber: number = Math.floor(Math.random() * (meals.length - 1)) + 1
            const meal: Meal = meals[randomNumber]
    
            if (mealsUsed.includes(meal.name)) { i--; continue }
            else { mealsFiltered.push(meal); mealsUsed.push(meal.name) }
        }
      
        resolve(mealsFiltered)
    })
}

export async function addMeal(name: string, content: string): Promise<void> {
    const date: Date = new Date()

    if (await mealExists(name)) {
        consola.error(`Meal ${name} already exists.`)
        return
    }

    getConnection().query(
        'INSERT INTO receipts (name, content, created_at) VALUES (?, ?, ?)',
        [name, content, date],
        (error) => {
            if (error) {
                consola.error(error)
            }
            else {
                consola.success(`${name} added.`)
            }
        }
    )
}

export async function mealExists(name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let exists = false

        getConnection().query(
            'SELECT id FROM receipts WHERE name=?',
            [name],
            (error, results) => {
                if (error) { consola.error(error); reject() }

                if (results.length > 0) { exists = true }
            
                resolve(exists)
            }
        )
    })
}

export async function getAllMeals(): Promise<Meal[]> {
    return new Promise((resolve) => {
        getConnection().query(
            'SELECT * FROM receipts',
            (error, results) => {
                if (error) { consola.error(error); return }
                else { resolve(results) }
            }
        )
    })
}