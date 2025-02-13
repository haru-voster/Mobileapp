import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ConstantString from "../constant/ConstantString";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";

export default function EmptyState(){


    const router=useRouter();
    return(
        <View style={{
            marginTop:80,
            display:'flex',
            alignItems:'center',

        }}>
           <Image source={require('./../assets/images/medicine2.png')}
           style={{
            height:120,
            width:120
           }}
           />
           <Text style={{
            fontSize:35,
            fontWeight:'bold',
            marginTop:30
           }}>{ConstantString.NoMedication}</Text>
           {/*another text  */}
            <Text style={{
            fontSize:16,
            marginTop:30,
            color:Colors.DARK_GRAY,
            alignItems:'center',
            marginTop:20
           }}>{ConstantString.MedicalSub}</Text>
        
        <TouchableOpacity style={{
            backgroundColor:Colors.PRIMARY,
            marginTop:30,
            Width:'100%',
            padding:15,
            marginTop:30

        }}
        onPress={()=>router.push('add-new-medication/')}
        >

            <Text style={{
                alignItems:"center",
                color:"white",
                fontSize:17 
            }}>{ConstantString.AddNewMedicationBtn}</Text>
        </TouchableOpacity>
        </View>
    )
}