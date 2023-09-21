import { Meal } from '../interfaces/meal.interface'
import { DatabaseService } from './database.service'
import { consola } from 'consola'

export class MealService {

    private readonly database: DatabaseService

    constructor() {
        this.database = new DatabaseService()
    }

    async getRandomMeals(meals: Meal[], number: number): Promise<Meal[]> {
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
    
    async addMeal(name: string, content: string): Promise<void> {
        const date: Date = new Date()
    
        if (await this.mealExists(name)) {
            consola.error(`Meal ${name} already exists.`)
            return
        }
    
        this.database.query(
            'INSERT INTO receipts (name, content, created_at) VALUES (?, ?, ?)',
            [name, content, date]
        )
    }
    
    async mealExists(name: string): Promise<boolean> {
        const response = await this.database.query(
            'SELECT id FROM receipts WHERE name=?',
            [name]
        )

        return response.length > 0
    }
    
    async getAllMeals(): Promise<Meal[]> {
        return await this.database.query(
            'SELECT * FROM receipts'
        )
    }
}