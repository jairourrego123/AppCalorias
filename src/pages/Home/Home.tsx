import { Text } from '@rneui/themed'
import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import { Button, Icon } from '@rneui/themed';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Meal, RootStackParamsList, TodayCaloriesProps } from '../../types';
import useFoodStorage from '../../hooks/useFoodStorage';
import TodayCalories  from '../../components/TodayCalories';
import TodayMeals from '../../components/TodayMeals';

const totalCaloriesPerDay = 2000;
const Home = () => {
  const [todayFood, setTodayFood] = useState<Meal[]>([])
  const [todayStadistic, setTodayStadistic] = useState<TodayCaloriesProps>({consumed:0,total:totalCaloriesPerDay,remaining:0,porcentage:0});
  const { onGetTodayFoods } = useFoodStorage();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamsList, 'Home'>>();


  const calculateTodayStadistic = (meals: Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce((acum, curr) => acum + Number(curr.calories), 0);

      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const porcentage = (caloriesConsumed / totalCaloriesPerDay) * 100

      setTodayStadistic({ consumed: caloriesConsumed, porcentage, remaining: remainingCalories });
    } catch (error) {
      console.error(error);

    }
  }

  const loadTodayFood = useCallback(async () => {
    try {
      const todyFoodResponse = (await onGetTodayFoods()) as Meal[];
      calculateTodayStadistic(todyFoodResponse);
      setTodayFood(todyFoodResponse);
    } catch (error) {
      console.error(error);
      setTodayFood([])
    }

  }, []);

  useFocusEffect(useCallback(() => {
    loadTodayFood().catch(null);

  }, [loadTodayFood]))

  const handleAddCaloriesPress = () => {

    navigate('AddFood')

  }


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calories </Text>
        </View>
        <View style={styles.rightContainer}>
          <Button

            icon={<Icon name="add-circle-outline" color="#fff" />}
            radius='lg'
            color='#4ecb71'
            onPress={handleAddCaloriesPress}
          />


        </View>
      </View>
      <TodayCalories {...todayStadistic} />
      <TodayMeals foods={todayFood} onCompleteAddRemove={loadTodayFood}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    flex: 1,
  },

  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  caloriesLegend: {
    fontSize: 20,
  },
})

export default Home