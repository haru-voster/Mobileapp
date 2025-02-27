import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constant/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function MedicationCardItem({ medicine }) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ url: medicine?.type?.icon }}
          style={{
            height: 60,
            width: 60,
          }}
        />
        </View>
        <View>

          <Text styles={{fontSize:22, fontWeight:'bold'}}>{medicine?.name}</Text>
          <Text styles={{fontSize:22}}>{medicine?.when}</Text>
          <Text styles={{color:'white'}}>{medicine?.dose} {medicine?.type.name}</Text>
        </View>
      </View>
          <View style={styles.reminderContainer}>
          <Ionicons name="timer-outline" size={24} color="black" />
            <Text >{medicine?.reminder}</Text>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    padding:10,
    marginTop:15,
    margin:10,
    backgroundColor:Colors.LIGHT_GRAY_BORDER ,
    borderRadius:15,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    alignItems:'center'

  },
  imageContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginRight:15
  },
  subContainer:{
    flexDirection:'row',
     alignItems:'center'
  },
  reminderContainer:{
    padding:15,
   // backgroundColor:'white',
    borderRadius:15,
    alignItems:"center",
    backgroundColor:Colors.LIGHT_GRAY_BORDER ,
    borderWidth:1
  }

});
