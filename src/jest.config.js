module.export =  {
    'roots': [
        '<rootDir>/services',
        '<rootDir>/tests'
    ],
    'testMatch': [
        '*/tests/*.spec.ts',
    ],
    'transform': {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
}