import React, {FC} from 'react';
import { View, StyleSheet, Text } from 'react-native';

import CircularProgress from 'react-native-circular-progress-indicator';
import { TodayCaloriesProps } from '../../types';

const TodayCalories: FC<TodayCaloriesProps> = ({ 
    total = 2000, 
    consumed =0, 
    remaining=0,
    porcentage = 0 
}) => {

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <CircularProgress value={porcentage} valueSuffix='%' />
            </View>
            <View style={styles.rightContainer}>

                <Text style={styles.today}>Today</Text>
                <View style={styles.rightItem}>
                    <Text style={styles.rightItemLegend}>Total</Text>
                    <Text style={styles.rightItemValue}>{total}</Text>
                </View>
                <View style={styles.rightItem}>
                    <Text style={styles.rightItemLegend}>Consumed</Text>
                    <Text style={styles.rightItemValue} >{consumed}</Text>
                </View>
                <View style={styles.rightItem}>
                    <Text style={styles.rightItemLegend} >Remaining</Text>
                    <Text style={styles.rightItemValue}>{remaining}</Text>
                </View>
            </View>
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    today: {
        marginBottom:14,
        fontWeight:'bold',
        fontSize:18,
        color:"#000"
    },
    rightItem: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    rightItemLegend: {
        flex:1,
    },
    rightItemValue: {
        flex:1,
        alignItems:'flex-end',
        textAlign:'right'
    },
})
export default TodayCalories;