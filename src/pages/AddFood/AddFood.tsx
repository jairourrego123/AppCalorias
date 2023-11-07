import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import Header from '../../components/Header'
// import { Text } from '@rneui/themed'
function AddFood() {
  return (
    <View style={styles.container}>
      <Header/>
       
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:12,
    backgroundColor:'#fff',
    flex:1,
  },

})
export default AddFood