export type RootStackParamsList = {
    Home: undefined;
    AddFood: undefined;
};

export type Meal = {
    calories: string;
    name: string;
    portion: string;
    date?: string;
};
export type TodayCaloriesProps = {
    total?: number | string;
    consumed: number | string;
    remaining: number | string;
    porcentage: number;
};