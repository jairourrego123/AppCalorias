import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import Header from '../../components/Header'
import { Button, Icon, Input } from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import useFoodStorage from '../../hooks/useFoodStorage';
import { Meal } from '../../types';
import MealItem from '../../components/MealItem';
// import { Text } from '@rneui/themed'
function AddFood() {
    const [visible, setIsvisible] = useState<boolean>(false)
    const [foods, setFoods] = useState<Meal[]>([])
    const [search, setSearch] = useState<string>('')
    const { onGetFoods } = useFoodStorage()
    const loadFoods = async () => {
        try {
            const foodResponse = await onGetFoods();
            setFoods(foodResponse)

        } catch (error) {
            console.error(error);

        }
    }


    useEffect(() => {
        loadFoods().catch(null)
    },[])
    const handleModalClose = async (shouldUpdate?: boolean) => {
        if (shouldUpdate) {
            Alert.alert('Comida guardada exitosamente')
            loadFoods();
        }


        setIsvisible(false)
    }

    const handleSearchPress = async () => {
        try {
        
            const result = await onGetFoods();
            console.log(result.filter((item: Meal) => item.name.includes(search)));
            
            setFoods(result.filter((item: Meal) => item.name.toLowerCase().includes(search.toLowerCase())));
        } catch (error) {
                console.error(error);
                setFoods([]);
                
        }
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.addFoodContainer}>
                <View style={styles.legendContainer}>
                    <Text style={styles.addFoodLegend}>Add Food</Text>
                </View>
                <View style={styles.addFoodBtnContainer}>
                    <Button

                        icon={<Icon name="add-circle-outline" color="#fff" />}
                        radius='lg'
                        color='#4ecb71'
                        size='sm'
                        onPress={() => { setIsvisible(true) }}
                    //   onPress={handleAddCaloriesPress}
                    />
                </View>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.inputSearch}>
                    <Input placeholder="apples, fries, soda...." value={search} onChangeText={(text: string) => (setSearch(text))} />
                </View>

                <Button title="Search" color={"#ade8af"} titleStyle={styles.searchBtnTitle} radius={'lg'} onPress={handleSearchPress} />

            </View>
            <ScrollView style={styles.content}>
                {foods?.map(meal => (
                    <MealItem key={`my-meal-itel-${meal.name}`} {...meal} isAbletoAdd />
                ))}
            </ScrollView>
            <AddFoodModal visible={visible} onClose={handleModalClose} />
        </View>
    )
} 0

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#fff',
        flex: 1,
    },
    addFoodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,

    },
    legendContainer: {
        flex: 1,
        // alignItems:'flex-start'
    },
    addFoodBtnContainer: {
        flex: 1,
        alignItems: 'flex-end'

    },
    addFoodLegend: {
        fontSize: 20,
        color: '#000'
    },
    searchContainer: {
        flexDirection: 'row',


    },
    inputSearch: {
        flex: 1,
        marginLeft: -12
        // alignItems:'flex-start',
        // width:'100%'
    },
    searchBtnTitle: {
        color: "#000",
        fontSize: 14,
    },
    content: {},

})
export default AddFood