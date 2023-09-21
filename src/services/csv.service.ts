import { Meal } from '../interfaces/meal.interface'

export class CSVService {
    async createListeDeCourse(meals: Meal[]): Promise<string[]> {
        return new Promise((resolve) => {
            const allElements: { [key: string]: number } = {}
    
            meals.forEach((meal: Meal) => {
                const receipt: string[] = meal.content.split(';')
    
                receipt.forEach((element) => {
                    if (Object.keys(allElements).includes(element)) {
                        allElements[element] += 1
                    }
                    else {
                        allElements[element] = 1
                    }
                })
            })
    
            const lines: string[] = []
            Object.keys(allElements).forEach((element) => {
                lines.push(`${allElements[element].toString()} ${element}`)
            })
    
            resolve(lines)
        })
    }
}