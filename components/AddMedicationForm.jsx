import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AddNewMedication(){
   return(
       <View style={{
        padding:25
       }}>
           <Text style={styles.header}>Add New Medication</Text>
           <View>
           <AntDesign name="medicinebox" size={24} color="black" />
           
           </View>
       </View>
   )
} 
const styles = StyleSheet.create({
  header:{
    fontSize:25,
    fontWeight:'bold'
  }
})
