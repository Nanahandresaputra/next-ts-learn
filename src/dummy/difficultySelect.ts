interface DifficultyItems {
    value: string;
    label: string;
}

const difficultySelect: DifficultyItems[] = [
    {
        value: 'easy',
        label: 'Easy',
    },
    {
        value: 'medium',
        label: 'Medium',
    },
    {
        value: 'hard',
        label: 'Hard',
    },
];

export default difficultySelect;