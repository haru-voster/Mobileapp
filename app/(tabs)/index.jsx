import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import Header from "../../components/Header";

export default function HomeScreen(){
    return (
        <View style={{
            padding:25,
            backgroundColor:'white',
            height:'100%'
        }}>
           <Header/>
            
        </View>
    )
}