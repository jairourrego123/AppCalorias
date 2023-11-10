import AsyncStorage from '@react-native-async-storage/async-storage';
import { isToday } from 'date-fns';

const MY_FOOD_KEY = '@MyFood:key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:key';
import { Meal } from '../types';
const useFoodStorage = () => {
    const saveInfoToStorage = async(storageKey: string,meal:Meal) =>{
        try {
            const currentSaveFood = await AsyncStorage.getItem(storageKey);

            if (currentSaveFood !== null) {
                const currentSaveFoodParsed = JSON.parse(currentSaveFood);



                currentSaveFoodParsed.push(meal);

                await AsyncStorage.setItem(storageKey, JSON.stringify(currentSaveFoodParsed))
                return Promise.resolve()
            }
            await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));
            return Promise.resolve();

        } catch (error) {
            return Promise.reject(error)
        }

    }
    const handleSaveFood = async ({ calories, name, portion }: Meal) => {

        try {
          const result = await saveInfoToStorage(MY_FOOD_KEY,{calories,name,portion})
          return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }

    };

    const handleGetFoods = async () => {

        try {
            const foods = await AsyncStorage.getItem(MY_FOOD_KEY)
            if (foods !== null) {
                const parseFoods = JSON.parse(foods)
                return Promise.resolve(parseFoods)

            }
        } catch (error) {
            return Promise.reject(error)
        }

    }

    const handleSaveTodayFood = async ({ calories, name, portion }: Meal) => {

        try {
            const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY,{calories,name,portion, date: new Date().toISOString()})
            return Promise.resolve()
        } catch (error) {
            return Promise.reject()
        }

    }

    const handleGetTodayFood = async ()=>{
        try {
            const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);
            if (foods !== null) {
                const parseFoods = JSON.parse(foods) as Meal [];
                return Promise.resolve(parseFoods.filter(meal => meal.date && isToday(new Date(meal.date))))

            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
    const handleRemoveTodayFood = async (index:number) =>{
        try {
            const todayFood = await handleGetTodayFood();
            const filterItem= todayFood?.filter((item:Meal,itemIndex)=>{
                return itemIndex!== index
            })

            await AsyncStorage.setItem(MY_TODAY_FOOD_KEY,JSON.stringify(filterItem))
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
            
        }
    }
    return {
        onSaveFood: handleSaveFood,
        onGetFoods: handleGetFoods,
        onSaveTodayFoods: handleSaveTodayFood,
        onGetTodayFoods:handleGetTodayFood,
        onDeleteTodayFood:handleRemoveTodayFood,
    };
};

// Guardar informacion de comida del dia de hoy 
// Metodo para obtener info de comida del dia de hoy 
//

export default useFoodStorage