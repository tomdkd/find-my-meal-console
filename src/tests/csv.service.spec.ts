import { CSVService } from '../services/csv.service'

test('base', async () => {
    const csvService = new CSVService()
    const expected = [
        '1 tata',
        '1 toto',
        '2 titi',
        '1 hello',
        '1 hi'
    ]
    const meals = [
        {
            id: 1234,
            name: 'toto',
            content: 'tata;toto;titi',
            created_at: new Date().toDateString(),
            updated_at: new Date().toDateString(),
        },
        {
            id: 1235,
            name: 'tutu',
            content: 'hello;hi;titi',
            created_at: new Date().toDateString(),
            updated_at: new Date().toDateString(),
        }
    ]

    expect(await csvService.createListeDeCourse(meals)).toStrictEqual(expected)
})