import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function  MedicationActionModal() {

    const medicine=useLocalSearchParams();
    console.log(medicine);

    return (
      <View style={StyleSheet.container}>
        
      </View>
    )
  }
const styles = StyleSheet.create({
  container:{
    padding:25,
    justifyContent:'center',
    alignItems:"center",

  }
})
