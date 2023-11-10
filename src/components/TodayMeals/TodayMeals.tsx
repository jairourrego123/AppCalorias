import React, { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Meal } from "../../types";
import MealItem from "../MealItem";

type TodayMealsPropos = {
    foods: Meal[];
    onCompleteAddRemove?: ()=> void;
}
const TodayMeals: FC<TodayMealsPropos> = ({ foods,onCompleteAddRemove }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comidas </Text>
            <ScrollView style={styles.content}>
                {foods?.map((meal : Meal, index)=>(
                <MealItem key={`today-meal-item-${meal.name}-${index}`} {...meal} onCompleteAddRemove={onCompleteAddRemove} itemPosition={index}/>
                ))}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:24,
    },
    content: {
        marginVertical:16,
    },
    title:{
        fontSize:16,
    },

})
export default TodayMeals