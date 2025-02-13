import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { useRouter } from 'expo-router';
 
export default function AddMedicationForm(){

    const router=useRouter();
    return(
        <View>
          <Image source={require('./../assets/images/consult.png')}
            style={{
                width:'70%',
                height:280
            }}
            />
            <TouchableOpacity
            style={{
                padding:25,
                position:'absolute'
            }}
            onPress={()=>{ router.back() }}
            >
            <Ionicons name="arrow-back" size={24} color='black' />
            </TouchableOpacity>
        </View>
    )
 }