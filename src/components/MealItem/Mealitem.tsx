import React, { FC } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Icon } from "@rneui/themed"
import { Meal } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
type MealitemProps = Meal & {
    isAbletoAdd?: boolean;
    onCompleteAddRemove?: () => void;
    itemPosition?: number;
}

const MealItem: FC<MealitemProps> = ({ calories, portion, name, isAbletoAdd, onCompleteAddRemove, itemPosition }) => {
    const { onSaveTodayFoods, onDeleteTodayFood } = useFoodStorage();

    const handleItemPress = async () => {
        try {
            if (isAbletoAdd) {
                await onSaveTodayFoods({ calories, portion, name })
                Alert.alert('Comida agregada al dia');
            } else {
                await onDeleteTodayFood(itemPosition?? -1);
                Alert.alert("Comida Eliminada Satisfactoriamente")
            }
            onCompleteAddRemove?.();
        } catch (error) {
            console.error(error);
            Alert.alert('Comida no agregada al dia')

        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.portion}>{portion}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Button icon={<Icon name={isAbletoAdd ? "add-circle-outline" : "close"} />} type="clear" containerStyle={styles.iconButtom} radius='lg' size="sm" onPress={handleItemPress} />
                <Text style={styles.calories}>{calories} cal</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ade8af',
        marginBottom: 12,
        borderRadius: 12,
        padding: 12,
        flex: 1,
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignContent:'center',
        // margin:8,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // alignContent:'center',
        // margin:8,
    },
    name: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500'

    },
    portion: {
        fontSize: 13,
        color: "#808080",
        fontWeight: '500',
    },
    calories: {
        color: '#000',
        fontSize: 18,

    },
    iconButtom: {
        marginBottom: -8
    },
})
export default MealItem